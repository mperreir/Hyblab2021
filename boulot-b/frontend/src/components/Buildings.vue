<template>
    <div id="img_container">
        <img class="hide" id="tower" src="@/assets/tower.svg" alt="tower">
        <img class="hide" id="first_tree" src="@/assets/tree2.png" alt="tree">
        <img class="hide" id="yellow_house" src="@/assets/yellow_house.svg" alt="yellow house">
        <img class="hide" id="white_house" src="@/assets/white_house.svg" alt="white house">
        <img class="hide" id="blue_house" src="@/assets/blue_house.svg" alt="blue house">
        <img class="hide" id="second_tree" src="@/assets/tree.png" alt="tree">
    </div>
</template>

<script>
    import {Themes,Styles} from "@/store.js";
    export default {
        name: "buildings",
        methods: {
            checkTowerActive() {
                if (this.$root.$data.state.choice.theme === Themes.CULTURE || this.$root.$data.state.choice.theme === Themes.ALEA) {
                    let tower = document.getElementById('tower');
                    tower.style.display='inline';
                }
            },
            checkFirstTreeActive() {
                if (this.$root.$data.state.choice.theme === Themes.NATURE) {
                    let tree = document.getElementById('first_tree');
                    tree.style.display='inline';
                }
            },
            checkYellowActive() {
                if (this.$root.$data.state.choice.style === Styles.BOULEVARDS || this.$root.$data.state.choice.style === Styles.RUELLES) {
                    let yellow_house = document.getElementById('yellow_house');
                    yellow_house.style.display='inline';
                }
            },            
            checkWhiteAndBlueActive() {
                if (this.$root.$data.state.choice.style === Styles.BOULEVARDS) {
                    let white_house = document.getElementById('white_house');
                    white_house.style.display='inline';
                    let blue_house = document.getElementById('blue_house');
                    blue_house.style.display='inline';
                }
            },
            checkSecondTreeActive() {
                if (this.$root.$data.state.choice.theme === Themes.NATURE || this.$root.$data.state.choice.theme === Themes.ALEA) {
                    let tree = document.getElementById('second_tree');
                    tree.style.display='inline';
                }
            },
            checkActive() {
                this.checkTowerActive();
                this.checkFirstTreeActive();
                this.checkYellowActive();
                this.checkWhiteAndBlueActive();
                this.checkSecondTreeActive();
            }
        },
        mounted: function() {
            this.checkActive();
        }
    }
</script>

<style scoped>
    .hide {
        display: none;
    }

    #first_tree, #second_tree, #tower, #yellow_house, #white_house, #blue_house {
        position: absolute;
        bottom: -1%;
    }
    #first_tree {
        width: 30%;
        left: -8%;
    }
    #second_tree {
        width: 34%;
        right: -17%;
    }
    #tower {
      width: 10%;
        left: 15%;
        z-index: -1;
    }
    #yellow_house {
        width: 15%;
        right: 22%;
        z-index: 1;
    }
    #white_house {
      width: 10%;
      right: 12%;
      z-index: 0;
    }
    #blue_house {
      width: 8%;
        right: 3%;
    }
    .bounceInDown {
        display: inline;
        animation-name: bounceInDown;
        animation-duration: 2s;
        animation-fill-mode: both;
    }
  
    @keyframes bounceInDown {
    0%, 60%, 75%, 90%, 100% {
    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    
    0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
    }
    
    60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
    }
    
    75% {
    transform: translate3d(0, -10px, 0);
    }
    
    90% {
    transform: translate3d(0, 5px, 0);
    }
    
    100% {
    transform: none;
    }
  }
</style>