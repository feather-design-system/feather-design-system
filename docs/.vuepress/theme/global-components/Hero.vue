<template>
  <div class="hero-container">
    <canvas class="hero-transition" ref="canvas">
    </canvas>
    <slot name="spacer"></slot>
    <div class="hero-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  data() {
    return {
      startTime: null,   //the timestamp at each 'keyframe'
      lastUpdate: null,  //the timestamp at the last update
      ctx: null,         //canvas context
      gradients: [],     //the collection of gradients to draw
      allowedColors: [
        "#607DFF",
        "#A9E5F9",
        "#F0E1F4",
        "#DBE6FF"
      ], //colors we can choose from
      targetColors: [],  //colors currently transitioning to
      currentColors: [], //the current color values
      startingColors: [],//the colors at the last 'keyframe'
      duration: 3000,    //transition duration
    };
  },
  setup() {
    const canvas = ref(null);
    return {
      canvas
    }
  },
  mounted() {
    //init
    this.ctx = this.canvas.getContext("2d");
    this.init();

    //create a gradient obj
    var gradient = this.ctx.createRadialGradient(100,100,0,100,100,500);

    //set up the actual gradient colors
    gradient.addColorStop(0, 'rgba(255,0,0,0.5)');
    gradient.addColorStop(1, 'rgba(255,0,0,0)');

    // Set the fill style and draw a rectangle
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  },
  methods: {
    init() {
      //get canvas dimensions
      this.ctx.canvas.width = this.canvas.clientWidth;
      this.ctx.canvas.height = this.canvas.clientHeight;

      //setup the gradient locations
      //top-left
      this.gradients.push((c) => c.createRadialGradient(0,0,0,0,0,this.getGradientSize()*1.2));
      //bottom-left
      this.gradients.push((c) => c.createRadialGradient(0,this.ctx.canvas.height,0,0,this.ctx.canvas.height,this.getGradientSize()));
      //top-right
      this.gradients.push((c) => c.createRadialGradient(this.ctx.canvas.width,0,0,this.ctx.canvas.width,0,this.getGradientSize()));
      //bottom-right
      this.gradients.push((c) => c.createRadialGradient(this.ctx.canvas.width,this.ctx.canvas.height,0,this.ctx.canvas.width,this.ctx.canvas.height,this.getGradientSize()*1.2));

      //set initial color targets
      const initialColor = this.hexToRgb("#ffffff");
      this.gradients.forEach(() => {
        this.currentColors.push(initialColor);
        this.startingColors.push(initialColor);
      });

      //set color targets
      this.getTargets();
      window.requestAnimationFrame(this.render);
    },
    render(timestamp) {
      if(!this.startTime) {
        this.startTime = timestamp;
      }
      const elapsed = timestamp - this.startTime;
      const ratio = elapsed / this.duration;

      if(this.lastUpdate !== timestamp) {
        //main render code
        //clear the canvas for re-paint
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.gradients.forEach((el, i) => {
          //get new target color
          const newColor = this.calcCurrentColor(this.startingColors[i], this.targetColors[i], ratio);
          //get the gradient
          const gradient = this.gradients[i](this.ctx);
          //set the color stops
          gradient.addColorStop(0, `rgba(${newColor.r},${newColor.g},${newColor.b},1)`);
          gradient.addColorStop(1, `rgba(${newColor.r},${newColor.g},${newColor.b},0)`);
          //draw
          this.ctx.fillStyle = gradient;
          this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        });
      }

      if (elapsed < this.duration) {
        //queue next frame
        this.lastUpdate = timestamp;
        window.requestAnimationFrame(this.render);
      } else {
        //just to be sure...
        this.currentColors = this.targetColors;
        this.startingColors = this.targetColors;

        //re-prime the animation
        this.lastUpdate = null;
        this.startTime = null;
        this.getTargets();
        window.requestAnimationFrame(this.render);
      }
    },
    getGradientSize() {
      const base = Math.max(this.ctx.canvas.width, this.ctx.canvas.height);
      return Math.floor(base/2);
    },
    getTargets() {
      this.targetColors = [];
      this.gradients.forEach(() => {
        //select a random color
        let newColor = this.allowedColors[Math.floor(Math.random()*this.allowedColors.length)];
        this.targetColors.push(this.hexToRgb(newColor));
      });
    },
    calcCurrentColor(startColor, targetColor, ratio) {
      return {
        r: this.calcComponent(startColor.r, targetColor.r, ratio),
        g: this.calcComponent(startColor.g, targetColor.g, ratio),
        b: this.calcComponent(startColor.b, targetColor.b, ratio)
      }
    },
    calcComponent(start, target, ratio) {
      const diff = target - start;
      return start + Math.floor(diff*ratio);
    },
    //util methods for color conversions
    rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
  }
};
</script>
<style lang="scss" scoped>
.hero-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  //background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  // width: 100vw;
  // position: relative;
  // left: 50%;
  // right: 50%;
  // margin-left: -50vw;
  // margin-right: -50vw;
}
canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
div.hero-content {
  z-index: 1;
  text-align: center;
  padding: 60px 0;
}
::v-deep(h2) {
  border: none;
}
</style>
