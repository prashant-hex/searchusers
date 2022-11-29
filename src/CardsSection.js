import React, { Component } from 'react';
import logo from '../src/avatar.png';
import nodata from '../src/nodata.png';
import VisibilitySensor from "react-visibility-sensor";

export default class CardsSection extends Component {

    constructor(){
        super()
        this.state={
            oldData:[],
            usersdata:[],
            search:null,
            listsize:0,
            islastList:false
        }
    }

    componentDidMount(){
        fetch("https://dummyjson.com/users")
        .then(res=>res.json())
        .then(result =>{
            this.setState({usersdata:result.users, oldData:result.users})
            console.log(result)
        })
    }

    handleChange(e){
        this.setState({search:e.target.value},()=>{
             // console.log(e.target.value)
        if(e.target.value == "" || e.target.value == null){
            this.setState({oldData:this.state.usersdata})
        }else{
            this.setState({oldData:this.state.usersdata.filter(fil => fil.firstName.toLowerCase().includes(this.state.search) || fil.email.toLowerCase().includes(this.state.search) || fil.lastName.toLowerCase().includes(this.state.search)),
            })
        }
        console.log("usersdata",this.state.usersdata)
        console.log("oldData 222",this.state.oldData)
        })
    }

    renderList(data){
        return(
           data.length > 0 ?
           data.map((item,index)=>{
            return (
                <div className="col-md-3 mycards m-4">
                <div>
                    <p>{item.index}</p><img src={item.image}/>
                </div>
                <div>
                    <p>{item.firstName} {item.lastName}</p>
                    <p>{item.email}</p>
                </div>
                </div> 
            )
           }) :
           <>
           <h1 className='text-center text-white'>No data found !</h1>
           </>
        )     
    }

    appendMoredata(){
        console.log("append")
    }

  render() {
    return (
      <>
        <div className='search-div'>
            <p className='text-center search-text text-white'>Search your course</p>
            <div className="mb-3">
                <input type="text" className="form-control text-center m-auto" id="exampleFormControlInput1" placeholder="search here..."
                onChange={(e)=>this.handleChange(e)}
                />
            </div>
        </div>
        <div className='main-cards'>
            <div className="container text-center">
                <div className="row justify-space-around">

                        {
                            this.state.usersdata.length > 0 ?
                            this.renderList(this.state.oldData) : 
                                <div className='text-center'>
                                    <div class="spinner-border" role="
                                    status">
                                    <span class="visually-hidden text-center">Loading...</span>
                                </div>
                            </div>
                        }
                        {/* <VisibilitySensor
                         onChange={(isVisible) => {
                            if (index == this.state.usersdata.length - 1 && isVisible) {
                                if (!this.state.isLastList) {
                                    console.log(index, this.state.list)
                                    this.appendMoreData(this.props.options.filter((el, i) => i > this.state.list.length - 1 && i < this.state.list.length + 100))
                                }
                            }
                        }}
                        >
                        
                        </VisibilitySensor> */}
                        
                </div>
            </div>
        </div>
      </>
    )
  }
}
