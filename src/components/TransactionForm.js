import React, { Component } from 'react'
import { connect } from "react-redux"
import * as actions from '../actions/transactionActions'
import { bindActionCreators } from "redux";

class TransactionForm extends Component {
    
    state = {
        ...this.returnStateObject()
    }


    returnStateObject(){
        if(this.props.currentIndex == -1)
            return {
                bankCode: '',
                bAccountNo: '',
                bName:'',
                amount:''
            }
        else
            return this.props.list[this.props.currentIndex]
    }

    componentDidUpdate(prevProps){
        if(prevProps.currentIndex !== this.props.currentIndex || prevProps.list.length !== this.props.list.length)
            this.setState({...this.returnStateObject()})
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        if(this.props.currentIndex == -1)
            this.props.insertTransaction(this.state)
        else
            this.props.updateTransaction(this.state)
    }

    render() {
        return (
            <>
                <div className="my-5">
                    <h1 className="text-center"> Transaction Form </h1>
                </div>
                <div className="container contact-div">
                    <div className="row">
                        <div className="col-md-6 col-10 mx-auto">
                            <form autoComplete="off" onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <label for="exampleFormControlInput1">Bank Code</label>
                                    <input name="bankCode" type="text" value={this.state.bankCode} onChange={this.handleInputChange}  className="form-control" id="exampleFormControlInput1" placeholder="Enter Bank Code" required />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlInput1">Acount Number</label>
                                    <input name="bAccountNo" type="text" value={this.state.bAccountNo} onChange={this.handleInputChange} className="form-control" id="exampleFormControlInput1" placeholder="Enter A/C No." required />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlInput1">A/C Holder Name</label>
                                    <input name="bName" type="text" value={this.state.bName} onChange={this.handleInputChange}  className="form-control" id="exampleFormControlInput1" placeholder="Enter A/C Holder Name" required />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1">Amount</label>
                                    <input name="amount" type="text" value={this.state.amount} onChange={this.handleInputChange}  className="form-control" id="exampleFormControlInput1" placeholder="Enter Amount" required />
                                </div>
                                <div clasName="col-12">
                                    <button className="btn btn-outline-primary" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.list,
        currentIndex:state.currentIndex
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        insertTransaction: actions.insert,
        updateTransaction: actions.update
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
