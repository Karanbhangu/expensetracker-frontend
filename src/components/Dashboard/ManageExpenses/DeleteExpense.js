import React from 'react'
import './Manage.css'

const DeleteExpense = (props) => {
    const deleteNote = async (id) => {
        props.deleteExpense(id,props.page)
        props.showMenu(false);
    }
  return (
    <div className={props.isVisible?"delete-box":"delete-box hide"}>
        <div className="confirmation">
            <h2>Delete Expense?</h2>
            <h3>Are you sure you want to delete this expense?</h3>
            <div className="confirm-btns">
                <button onClick={()=>{deleteNote(props.deleteId)}}>Yes</button>
                <button onClick={()=>{props.showMenu(false)}}>No</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteExpense