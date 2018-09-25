import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      },
      adoptedList: []
    }
  }

  onChangeType = (filterValue) => {
    this.setState({
      ...this.state,
      filters: {
        type: filterValue
      }
    })
  }

  onFindPetsClick = () => {
    let queryParameter = ''
    let animalType = this.state.filters.type
    
    if (animalType !== 'all') {
      queryParameter = `?type=${animalType}`  
    }
    
    fetch(`/api/pets${queryParameter}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          ...this.state,
          pets: data
        })
      })
  }
  
  onAdoptPet = (petId) => {
    let currentlyAdopted = this.state.adoptedList.slice()
    currentlyAdopted.push(petId)
    
    this.setState({
      ...this.state,
      adoptedList: currentlyAdopted
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
