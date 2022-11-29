import React, { Component } from 'react';
import bootstrap from 'bootstrap'

export default class SearchText extends Component {

    constructor(){
        super()
        this.state={

        }
    }

    handleChange(e){
        console.log(e.target.value)
    }

  render() {
    return (
        <div className='search-div'>
            <p className='text-center search-text text-white'>Search your course</p>
            <div class="mb-3">
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="search here..."
                onChange={(e)=>this.handleChange(e)}
                />
            </div>
        </div>
    )
  }
}
