<template>
       
        <div class="list-container" ref="listContainer" @scroll="handleScroll">       
            <div v-if="loadingFlag" class="loader"><div class="loading-overlay"></div></div>

            <div v-else v-for="(color, index) in visibleColors" :key="index" class="box" :style="boxStyle(color)" >
            {{ index }}
            </div>
        </div>
    
</template>


<script lang="ts">
import { defineComponent } from 'vue';
declare module "vue-loading-overlay";
import 'vue-loading-overlay/dist/css/index.css';



export default defineComponent({
  data() {
    return {
      visibleColors: [] as Array<string>,
      limit: 0 as number,
      loadingFlag: false,
      loadingTimeout: null as Number|null,
      disableScroll: false,
    };
  },
  created(){
    this.getList(10)
  },
  computed: {
    scrollStyle() {
      return {
        overflowY: this.disableScroll ? 'hidden' : 'auto',
      };
    },
  },
  methods: {
    getRandomColor() {
      return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    },
    getList(count: number) {
        if (this.limit <50 && !this.loadingFlag){   
            this.loadingFlag = true
            const defaultColor = "rgb(233, 32, 38)";
            const colorList = [defaultColor];
            for (let i = 1; i < count; i++) {
                colorList.push(this.getRandomColor());
            }
            this.loadingTimeout = setTimeout(() => {
                this.visibleColors = [...this.visibleColors,...colorList]// Initially show first 10 colors
                this.loadingFlag=false
            }, this.getRandomDelay());
            this.limit += 10}
           
    },
    loadMoreColors() {
        this.getList(10)
    },
    boxStyle(color: string) {
      return {
        width: "100%",
        height: "500px",
        backgroundColor: color
      };
    },
    handleScroll() {
        if (this.disableScroll) {
            return; // Prevent scrolling while loading
        }
        const container = this.$refs.listContainer as HTMLElement;
        const scrollPosition = container.scrollTop;
        const containerHeight = container.clientHeight;
        const contentHeight = container.scrollHeight;

        if (scrollPosition > contentHeight / 2) {
            if (this.visibleColors.length < 50) {
                this.loadMoreColors(); 
        }
        // Load more colors when scrolled more than half the container's height
        }
    },
    getRandomDelay() {
      return Math.floor(Math.random() * 5000); // Random delay between 0 to 5 seconds (in milliseconds)
    },
  },
})
</script>
<style scoped>
.list-container {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  max-height: 500px; /* Limit the height of the scrollable area */
  overflow-y: auto; /* Enable vertical scrolling */
}

.loading-overlay {
  background-color: rgba(0, 0, 0, 0.9); /* Adjust the transparency as needed */
  pointer-events: none; /* Allow clicks on underlying elements */
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin: 10px;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  z-index: 999; /* Ensure the loader is on top of other content */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
