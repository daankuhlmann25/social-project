<template>
  <section
    ref="expandedSection"
    class="expanded-section"
    @click="expandSection">
    <slot></slot>
  </section>
</template>

<script>
export default {

  methods: {
    expandSection: function () {
      if (this.$refs.expandedSection.classList.contains('minimized')) {
        this.$refs.expandedSection.classList.replace('minimized', 'expanded')
        this.$refs.expandedSection.style.overflowY = 'scroll'
        this.$refs.expandedSection.style.maxHeight = `${this.$refs.expandedSection.scrollHeight}px`
        this.$refs.expandedSection.style.overflowY = ''
      }
    },
  },

  mounted() {
    this.$refs.expandedSection.style.overflowY = 'scroll'
    
    if ((this.$refs.expandedSection.scrollHeight - this.$refs.expandedSection.offsetHeight) > 40)
      this.$refs.expandedSection.classList.add('minimized')
    else {
      this.$refs.expandedSection.classList.add('expanded')
      this.$refs.expandedSection.style.maxHeight = `max-content`
    }

    this.$refs.expandedSection.style.overflowY = ''
  },
}
</script>

<style scoped>
  .expanded-section {
    transition: all .25s ease-out;
    position: relative;
    max-height: 20vh;
    min-height: 124px;
    overflow-y: hidden;
    pointer-events: none;
  }
  .expanded-section.minimized::after,
  .expanded-section.expanded::after {
    transition: all .25s ease-out;
    background-color: rgba(255, 255, 255, 0.1);
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDE0IDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNyA3TDEzIDEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=);
    background-repeat: no-repeat;
    background-position: center;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    content: "";
    width: 44px;
    height: 44px;
    left: calc(50% - 24px);
    border-radius: 24px;
    pointer-events: initial;
    cursor: pointer;
    position: absolute;
    bottom: 0;
  }

  .expanded-section.expanded::after {
    background: transparent;
    background-position: center;
    pointer-events: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .expanded-section.minimized::before,
  .expanded-section.expanded::before {
    transition: all .25s ease-out;
    background: linear-gradient(0deg, rgba(53,50,61,0.92) 0%, rgba(53,50,61,0) 100%);
    content: "";
    height: 50%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 50%;
    width: 100%;
  }
  
  .expanded-section.expanded::before {
    background: linear-gradient(0deg, rgba(53,50,61,0) 0%, rgba(53,50,61,0) 100%);
  }

  .expanded-section.expanded {
    pointer-events: unset;
  }

  .expanded-section h2,
  .expanded-section h3,
  .expanded-section h4 {
    color: #fff;
  }
</style>