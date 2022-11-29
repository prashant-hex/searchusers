import React, { Component } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import VisibilitySensor from 'react-visibility-sensor';
import './hexselect.css'

var oldData = []
export default class JudgePartylist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [], isListFound: false, search: '', isLastList: false, titlesLength: 0,
            typing: false,
            typingTimeout: 0,totalData:[]
        }
        this.appendMoreData = this.appendMoreData.bind(this)
    }
    appendMoreData(data) {
        if (data.length > 0) {
            if (data.length < this.state.titlesLength) {
                this.setState({ isLastList: true })
            } else {
                this.setState({ isLastList: false, titlesLength: data.length })
            }
            this.setState({ list: this.state.list.concat(data) ,totalData:this.state.totalData.concat(data) })
        } else {
            if (data.length < this.state.titlesLength) {
                this.setState({ isLastList: true })
            } else {
                this.setState({ isLastList: false })
            }
        }

    }
    changeName = (event) => {
        const self = this;

        console.warn("event change name",event)

        if (self.state.typingTimeout) {
            console.log("typing timeout",self.state.typingTimeout)
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            search: event.target.value,
            typing: false,
            typingTimeout: setTimeout(() => {
                self.onSearch(event);
            }, 1000)
        });
        console.log("last chnageName",this.state)
    }
    componentDidMount() {
        oldData = this.props.options
        if (this.props.options.length > 0) {
            this.setState({ list: this.props.options.filter((el, i) => i < 100),totalData:this.props.options.filter((el, i) => i < 100), isListFound: true })
        } else {
            this.setState({ isListFound: false })
        }
    }
    onSearch(e) {
        // this.setState({ search: e.target.value })
        console.warn("onsearch console fnc")
        if (e.target.value == '') {
            this.setState({ list: this.state.totalData, isListFound: true,isLastList:false })
        } else {
            if (oldData.filter((item) => (item[this.props.optionLabel]).toLowerCase().includes(e.target.value.toLowerCase())).length > 0) {
                this.setState({ list: oldData.filter((item) => (item[this.props.optionLabel]).toLowerCase().includes(e.target.value.toLowerCase())), isListFound: true,isLastList:true })
            } else {
                this.setState({ isListFound: false,isLastList:false })
            }
        }
    }
    render() {
        return (
            <Modal size="md" scrollable centered style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} show={true} onHide={() => this.props.onHide()}>
                <Modal.Body style={{ padding: "0px", height: "inherit" }}>
                    <div className="_judgepartylist_search">
                        <input type="text" className='form-control' value={this.state.search} onChange={(e) => this.changeName(e)} placeholder={`Search ${this.props.searchLabel}...`} />
                    </div>
                    <div className='_judgepartylist_outerbox'>
                        {
                            this.state.isListFound ?
                                this.state.list.map((item, index) => {
                                    return (
                                        <>
                                            <VisibilitySensor
                                                onChange={(isVisible) => {
                                                    if (index == this.state.list.length - 1 && isVisible) {
                                                        if (!this.state.isLastList) {
                                                            console.log(index, this.state.list)
                                                            this.appendMoreData(this.props.options.filter((el, i) => i > this.state.list.length - 1 && i < this.state.list.length + 100))
                                                        }
                                                    }
                                                }}
                                            >
                                                <div className='_judgepartylist' onClick={() => this.props.onChange(item)}>
                                                    <span>{item[this.props.optionLabel]}</span>
                                                </div>
                                            </VisibilitySensor>
                                            {
                                                (index == Object.keys(this.state.list).length - 1) ?
                                                    !this.state.isLastList ?
                                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: '100%', margin: "30px 0px" }}>
                                                            <Spinner animation="border" variant="dark" />
                                                        </div>
                                                        :
                                                        ""
                                                    :
                                                    ""
                                            }
                                        </>
                                    )
                                })
                                :
                                <div className='_judgepartylist_norecord'>
                                    <h5>No Record</h5>
                                </div>
                        }
                    </div>

                </Modal.Body>
            </Modal>
        )
    }
}
