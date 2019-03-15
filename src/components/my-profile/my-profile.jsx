import React, { Component } from 'react';
import { Checkbox, Button } from '@material-ui/core';
import _ from 'underscore';
import './my-profile.css';
 
class MyProfile extends Component {

    constructor() {
        super();

        this.state = {
            // In how many months do you need to find a place? 
            time_frames: [
                { name: 'Söker aktivt, behöver boende snarast',  selected: false, val: '1' },
                { name: 'Söker boende om 1 - 3 månader',  selected: false, val: '3' },
                { name: 'Söker boende om 3 - 6 månader',  selected: false, val: '6' },
                { name: 'Söker boende om 6+ månader',  selected: false, val: '7' }
            ],

            // cost per month -spans
            cost_monthly: [
                { name: '2000 - 3000',  selected: false, val: '1' },
                { name: '3000 - 4000',  selected: false, val: '2' },
                { name: '4000+',  selected: false, val: '3' }
            ],

            // tags for types of living 
            living_factors: [
                { name: 'Hus / Villa',  selected: false, val: '5', icon: 'house.svg' }
                { name: 'Lägenhet',  selected: false, val: '6', icon: 'apartments.svg' },
                { name: 'Djur',  selected: false, val: '7', icon: 'animals.svg' },
                { name: 'Natur',  selected: false, val: '8', icon: 'forest.svg' },
                { name: 'Pendling',  selected: false, val: '9', icon: 'tram.svg' }
            ]
        }
    }

    componentDidMount() {
        this.getProfile();
    }

    getProfile() {
        fetch('/api/get-profile', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token'), 
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.statusText === 'OK') {
                return response.json();
            }
        }).then(data => {
            if (data) {
                this.populateForm(data);
            }
        }).catch(err => {
            // Error :(
        }); 
    }

    populateForm(data) {
        var formData = { living_factors: this.state.living_factors }
        formData.living_factors.forEach((item,i)=> {
            formData.living_factors[i].selected = data.living_factors.indexOf( parseInt(formData.living_factors[i].val)) !== -1;
        });
        this.setState(formData);
    }

    printFactors() {
        return this.state.living_factors.map((item,i) => {
            return <label className="form_row__box" key={i}>
                <img className="form_row__box-icon" src={'/assets/icons/' + item.icon} alt="" />
                <div>
                    <Checkbox onChange={() => this.changeState('living_factors',i)} checked={item.selected} />
                    {item.name}
                </div>
            </label>
        });
    }

    changeState(name,index) {
        var _state = this.state[name];
        _state[index].selected = _state[index].selected === true ? false : true;
        this.setState({[name]:_state});
    }

    printCostMonthly() {
        return this.state.cost_monthly.map((item,i) => {
            return <label className="form_row__box" key={i}>
                <img className="form_row__box-icon" src={'/assets/icons/' + item.icon} alt="" />
                <div>
                    <Checkbox onChange={() => this.changeState('cost_monthly',i)} checked={item.selected} />
                    {item.name}
                </div>
            </label>
        });
    }

    prepareSaveObject() {
        return {
            living_factors: _.chain(this.state.living_factors)
                .where({selected: true})
                .pluck('val')
                .flatten()
                .value()
        }
    }

    saveProfile = (event) => {
        var saveObject = this.prepareSaveObject();
        fetch('/api/save-profile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token'), 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: saveObject})
        }).then(response => {
            if (response.statusText === 'OK') {
                return response.json();
            }
        }).then(data => {
            if (data.success) {
                console.log('Save Success');
            }
        }).catch(err => {
            // Error :(
        }); 
    }

    render() {
        return <section className="form_row">
            <div className="form_row__checkboxes">
                {this.printFactors()}
            </div>
            <div className="form_row__checkboxes">
                {this.printCostMonthly()}
            </div>
            <Button onClick={this.saveProfile} variant="contained">Spara!</Button>
        </section>
    }
};

export default MyProfile;
