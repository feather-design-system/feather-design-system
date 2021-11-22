<script>
import { h } from "vue";
export default {
  props: {
    center: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pressed: false,
      active: false,
      styles: {},
      failsafe: 0,
    };
  },
  computed: {
    parent() {
      return this.$el.parentNode;
    },
  },
  methods: {
    onClick($event) {
      //reset on every click
      this.pressed = false;
      this.active = false;
      requestAnimationFrame(() => {
        //get size
        const { clientWidth, clientHeight } = this.parent;
        const size = Math.round(Math.max(clientWidth, clientHeight));
        let position = {
          top: "0px",
          left: "0px",
        };

        if (!this.center) {
          //get position
          const rect = this.parent.getBoundingClientRect();
          const top = $event.pageY;
          const left = $event.pageX;

          position = {
            top: `${
              top - rect.top - size / 2 - document.documentElement.scrollTop
            }px`,
            left: `${
              left - rect.left - size / 2 - document.documentElement.scrollLeft
            }px`,
          };
        }
        this.styles = {
          ...position,
          height: `${size}px`,
          width: `${size}px`,
        };
        this.pressed = true;
        //now on the next animation frame set the class to start the active transitions
        //pressed will only make it appear in its small state with defined opacity
        //we need the active class to transition to the final opacity and scale
        requestAnimationFrame(() => {
          this.active = true;
          //in IE transitioncancel doesnt exist
          //failsafe is remove after a given timeout.
          clearTimeout(this.failsafe);
          this.failsafe = setTimeout(() => {
            this.pressed = false;
            this.active = false;
          }, 380 + 100 + 20);
        });
      });
    },
  },
  render() {
    if (this.pressed === false) {
      return undefined;
    }
    return h("div", {
      style: { ...this.styles },
      class: ["ripple", { active: this.active, center: this.center }],
      onTransitionEnd: () => {
        this.pressed = false;
        this.active = false;
      },
      onTransitionCancel: () => {
        this.pressed = false;
        this.active = false;
      },
    });
  },
  mounted() {
    this.parent.addEventListener("click", this.onClick);
    const parentStyles = window.getComputedStyle(this.parent);
    this.parent.style.overflow = "hidden";
    if (
      parentStyles.position === "relative" ||
      parentStyles.position === "absolute" ||
      parentStyles.position === "fixed"
    ) {
      return;
    }
    this.parent.style.position = "relative";
  },
  unmounted() {
    this.parent.removeEventListener("click", this.onClick);
  },
};
</script>
<style lang="scss" scoped>
.ripple {
  transform: scale(0.25);
  position: absolute;
  border-radius: 50%;
  will-change: opacity transform;
  transition: opacity 100ms ease-out 380ms, transform 380ms ease-out;
}
.active {
  opacity: 0 !important;
  transform: scale(2);
  &.center {
    transform: scale(1);
  }
}
</style>
