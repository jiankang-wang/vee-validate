import { createRenderless } from '../utils/vnode';
import { isCallable, values, warn } from '../utils';

const flagMergingStrategy = {
  pristine: 'every',
  dirty: 'some',
  touched: 'some',
  untouched: 'every',
  valid: 'every',
  invalid: 'some',
  pending: 'some',
  validated: 'every'
};

function mergeFlags (lhs, rhs, strategy) {
  const stratName = flagMergingStrategy[strategy];

  return [lhs, rhs][stratName](f => f);
}

export const ValidationObserver = {
  name: 'ValidationObserver',
  provide () {
    return {
      $_veeObserver: this
    };
  },
  data: () => ({
    refs: {}
  }),
  methods: {
    $subscribe (provider) {
      this.refs = Object.assign({}, this.refs, { [provider.vid]: provider });
    },
    $unsubscribe ({ vid }) {
      delete this.refs[vid];
      this.refs = Object.assign({}, this.refs);
    },
    validate () {
      return Promise.all(values(this.refs).map(ref => {
        return ref.validate().then(result => {
          ref.applyResult(result);

          return result;
        });
      })).then(results => results.every(r => r.valid));
    },
    reset () {
      return values(this.refs).forEach(ref => {
        ref.reset();
      });
    }
  },
  computed: {
    ctx () {
      const ctx = {
        errors: {},
        validate: () => this.validate(),
        reset: () => this.reset()
      };

      return values(this.refs).reduce((acc, provider) => {
        Object.keys(flagMergingStrategy).forEach(flag => {
          if (!(flag in acc)) {
            acc[flag] = provider.flags[flag];
            return;
          }

          acc[flag] = mergeFlags(acc[flag], provider.flags[flag], flag);
        });

        acc.errors[provider.vid] = provider.messages;

        return acc;
      }, ctx);
    }
  },
  render (h) {
    let slots = this.$scopedSlots.default;
    if (!isCallable(slots)) {
      if (process.env.NODE_ENV !== 'production') {
        warn('ValidationObserver expects a scoped slot. Did you forget to add "slot-scope" to your slot?');
      }

      return createRenderless(h, this.$slots.default);
    }

    return createRenderless(h, slots(this.ctx));
  }
};
