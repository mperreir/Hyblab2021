'use strict';

class User{
    constructor() {
        this.home = null;
        this.work = null;
        this.school = null;

        this.startFromHome = true;
        this.bySchool = false;

        this.culinaire = null;
        this.culture = null;
        this.insolite = null;

        this.transport = "motorcar";

    }
    updateHome(home){
        this.home = home;
        this.checkRequired();
    }
    updateWork(work){
        this.work = work;
        this.checkRequired();
    }
    updateSchool(school){
        this.school = school;
        this.bySchool = school != null;
    }

    checkRequired(){
        document.querySelector("#submit-form").disabled = !(this.home != null && this.work != null);
    }


}
