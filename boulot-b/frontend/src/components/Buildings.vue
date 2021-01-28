<template>
    <div id="img_container">
        <img class="hide" id="tower" src="@/assets/tower.png" alt="tower">
        <img class="hide" id="first_tree" src="@/assets/tree2.png" alt="tree">
        <img class="hide" id="yellow_house" src="@/assets/yellow_house.png" alt="yellow house">
        <img class="hide" id="white_house" src="@/assets/white_house.png" alt="white house">
        <img class="hide" id="blue_house" src="@/assets/blue_house.png" alt="blue house">
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
    #first_tree {
        position: relative;
        left: 5%;
    }
    #second_tree {
        position: relative;
        left: -10%;
    }
    #tower {
        position: relative;
        left: 7%;
        bottom: 3%;
        z-index: -1;
    }
    #white_house {
        position: relative;
        left: -3%;
    }
    #blue_house {
        position: relative;
        left: -5%;
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