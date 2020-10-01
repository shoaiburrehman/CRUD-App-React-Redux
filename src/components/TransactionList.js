import React, { Component } from 'react';
import TransactionForm from './TransactionForm';
import { connect } from "react-redux"
import * as actions from '../actions/transactionActions'
import { bindActionCreators } from "redux";

class TransactionList extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         currentIndex:-1,
    //         list: this.returnList()
    //     }
    // }

    // returnList() {
    //     if(localStorage.getItem('transactions') == null){
    //         localStorage.setItem('transactions', JSON.stringify([]))
    //     }
    //     return JSON.parse(localStorage.getItem('transactions'))
    // }

    // onAddorEdit = (data) => {
    //     var list = this.returnList()
    //     if(this.state.currentIndex == -1)
    //         list.push(data)
    //     else 
    //         list[this.state.currentIndex] = data
    //     localStorage.setItem('transactions', JSON.stringify(list))
    //     this.setState({ list, currentIndex:-1 })
    // }

    handleEdit = (index) => {
        this.props.updateTransactionIndex(index)
    }

    handleDelete = (index) => {
        this.props.deleteTransaction(index)
    }

    // handleSubmit = (e) => {
    //     e.prevenDefault()
    //     this.props.onAddorEdit(this.state)
    // }

    render() {
        return (
            <>
                <TransactionForm
                    // onAddorEdit = {this.onAddorEdit}
                    // currentIndex = {this.state.currentIndex}
                    // list = {this.state.list}
                />
                <div className="my-5">
                    <h1 className="text-center"> Transaction List </h1>
                </div>
                <div className="container contact-div">
                    <div className="row">
                        <div className="col-md-6 col-10 mx-auto">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Bank Code</th>
                                        <th scope="col">Bank Account No.</th>
                                        <th scope="col">A/C Holder Name</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.list.map((item, index) => {
                                            return <tr key={index}>
                                                    <th scope="row">{index}</th>
                                                    <td>{item.bankCode}</td>
                                                    <td>{item.bAccountNo}</td>
                                                    <td>{item.bName}</td>
                                                    <td>{item.amount}</td>
                                                    <td><a className="btn btn-primary btn-sm" onClick={() => this.handleEdit(index)}>Edit</a></td>
                                                    <td><a className="btn btn-primary btn-sm" onClick={() => this.handleDelete(index)}>Delete</a></td>
                                                </tr>
                                            
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state.list
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        deleteTransaction: actions.Delete,
        updateTransactionIndex: actions.updateIndex
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
