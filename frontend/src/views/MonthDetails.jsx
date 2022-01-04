import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { CategoryPreview } from '../cmps/month/CategoryPreview';
import { MonthHeader } from '../cmps/month/MonthHeader';

import actions from '../store/actions';



export const MonthDetails = () => {

    let { monthId } = useParams();
    const dispatch = useDispatch();
    const elCategoryTitle = useRef(null)
    const month = useSelector(state => state.monthModule.currMonth)

    useEffect(() => {
        dispatch(actions.monthActions.loadMonth(monthId))
    }, [dispatch, monthId]);

    const addCtegory = async (category) => {
        try {
            await dispatch(actions.monthActions.addCtegory(monthId, category))
            console.log('elCategoryPreview', elCategoryTitle.current.innerText);
            elCategoryTitle.current.focus()
            // elCategoryTitle.current.setSelectionRange(0, elCategoryTitle.current.innerText.length)
        } catch (err) {
            console.log(err);
        }
    }

    const deleteCategory = async (categoryId) => {
        try {
            dispatch(actions.monthActions.removeCategory(monthId, categoryId))
        } catch (err) {
            console.log(err);
        }
    }

    const updateCtegory = async (category) => {
        try {
            dispatch(actions.monthActions.updateCtegory(monthId, category))
        } catch (err) {
            console.log(err);
        }
    }

    const addExpense = async (categoryId, expense) => {
        try {
            dispatch(actions.monthActions.addExpense(monthId, categoryId, expense))
        } catch (err) {
            console.log(err);
        }
    }

    const deleteExpense = async (categoryId, expenseId) => {
        try {
            dispatch(actions.monthActions.removeExpense(monthId, categoryId, expenseId))
        } catch (err) {
            console.log(err);
        }
    }

    const updateExpense = async (categoryId, expense) => {
        try {
            dispatch(actions.monthActions.updateExpense(monthId, categoryId, expense))
        } catch (err) {
            console.log(err);
        }
    }

    const onPrevNextMonth = async (diff = 1) => {
        try {
            dispatch(actions.monthActions.loadPrevNextMonth(month, diff))
        } catch (err) {
            console.log(err);
        }
    }

    if (!month) return <div>Loading...</div>
    return (
        <section className="month-details">
            <MonthHeader month={month}
                addCtegory={addCtegory}
                onPrevNextMonth={onPrevNextMonth} />
            {month.categories && month.categories.map(category => <CategoryPreview
                ref={elCategoryTitle}
                category={category}
                key={category.id}
                updateCtegory={updateCtegory}
                deleteCategory={deleteCategory}
                addExpense={addExpense}
                updateExpense={updateExpense}
                deleteExpense={deleteExpense} />)}
        </section>
    )
}