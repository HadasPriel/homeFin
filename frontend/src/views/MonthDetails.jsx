import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom";
import { CategoryPreview } from '../cmps/category/CategoryPreview';
import { MonthHeader } from '../cmps/month/MonthHeader';
import { utilService } from '../services/util.service.js';
import actions from '../store/actions';



export const MonthDetails = () => {

    let { accountId, monthId } = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    const month = useSelector(state => state.monthModule.currMonth)

    useEffect(() => {
        if (monthId === 'null') return
        dispatch(actions.monthActions.loadMonth(monthId))

        return () => {
            dispatch(actions.monthActions.loadMonth(null))
        }
    }, [])

    useEffect(() => {
        if (!month || !month._id || monthId === month._id) return

        history.push(`/account/${accountId}/${month._id}`)
    }, [month])


    const addCtegory = async (category) => {
        try {
            dispatch(actions.monthActions.addCtegory(monthId, category))
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

    const updateExpense = useCallback(async (categoryId, expense) => {
        try {
            if (monthId === 'null') return
            dispatch(actions.monthActions.updateExpense(monthId, categoryId, expense))
        } catch (err) {
            console.log(err);
        }
    }, [dispatch])

    const onPrevNextMonth = async (diff = 1) => {

        try {
            let nextPrevTime = utilService.getNextPrevTime(month.time, diff)
            dispatch(actions.monthActions.loadMonthByTime(nextPrevTime))

        } catch (err) {
            console.log(err);
        }
    }

    if (!month || !month.time) return <div>Loading...</div>
    return (
        <section className="month-details">
            <MonthHeader month={month}
                addCtegory={addCtegory}
                onPrevNextMonth={onPrevNextMonth} />
            {month.categories && month.categories.map(category => <CategoryPreview
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