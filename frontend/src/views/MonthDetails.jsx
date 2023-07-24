import React, { useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { useEffectUpdate } from '../hooks/useEffectUpdate'

import { utilService } from '../services/util.service.js'
import actions from '../store/actions'

// import { ExpenseDetails } from './ExpenseDetails'
import { MonthHeader } from '../cmps/month/MonthHeader'
import { CategoryList } from '../cmps/category/CategoryList'


export const MonthDetails = (props) => {

    let { accountId, monthId } = useParams()
    let history = useHistory()
    const dispatch = useDispatch()
    const month = useSelector(state => state.monthModule.currMonth)
    const cols = useSelector(state => state.accountModule.currAcount.cols)

    useEffect(() => {
        if (monthId === 'null') return
        dispatch(actions.monthActions.loadMonth(monthId))

        return () => {
            dispatch(actions.monthActions.loadMonth(null))
        }
        // eslint-disable-next-line
    }, [])


    useEffectUpdate(() => {
        if (!month || !month._id || monthId === month._id) return

        history.push(`/account/${accountId}/${month._id}`)
        // eslint-disable-next-line
    }, [month])

    const scrollLeft = useRef()
    useEffect(() => {
        const scrollFunc = (ev) => {
            scrollLeft.current = ev.target.scrollLeft
            // console.log(scrollLeft.current);
        };
        const element = document.querySelector('.app-main')
        element.addEventListener("scroll", scrollFunc)

        return () => {
            element.removeEventListener("scroll", scrollFunc)
        }
    }, [])

    const updateMonth = async (field, value) => {
        try {
            const monthToSave = {
                ...month,
                [field]: value
            }
            dispatch(actions.monthActions.updateMonth(monthToSave))
        } catch (err) {
            console.log(err)
        }
    }

    const addCtegory = async (category) => {
        try {
            dispatch(actions.monthActions.addCtegory(monthId, category))
        } catch (err) {
            console.log(err)
        }
    }

    const deleteCategory = async (categoryId) => {
        try {
            dispatch(actions.monthActions.removeCategory(monthId, categoryId))
        } catch (err) {
            console.log(err)
        }
    }

    const updateCtegory = async (category) => {
        try {
            dispatch(actions.monthActions.updateCtegory(monthId, category))
        } catch (err) {
            console.log(err)
        }
    }

    const addExpense = async (categoryId, expense) => {
        try {
            dispatch(actions.monthActions.addExpense(monthId, categoryId, expense))
        } catch (err) {
            console.log(err)
        }
    }

    const deleteExpense = async (categoryId, expenseId) => {
        try {
            dispatch(actions.monthActions.removeExpense(monthId, categoryId, expenseId))
        } catch (err) {
            console.log(err)
        }
    }

    const updateExpense = useCallback(async (categoryId, expense) => {
        try {
            if (monthId === 'null') return
            dispatch(actions.monthActions.updateExpense(monthId, categoryId, expense))
        } catch (err) {

            console.log(err)
        }
        // eslint-disable-next-line
    }, [dispatch])

    const onPrevNextMonth = async (diff = 1) => {

        try {
            let nextPrevTime = utilService.getNextPrevTime(month.time, diff)
            dispatch(actions.monthActions.loadMonthByTime(nextPrevTime))

        } catch (err) {
            console.log(err)
        }
    }

    const updateLabel = (label) => {
        dispatch(actions.accountActions.saveLabel(accountId, label))
    }

    const removeLabel = (labelId) => {
        dispatch(actions.accountActions.removeLabel(accountId, labelId))
    }



    if (!month || !month.time) return <div>Loading...</div>
    return (
        <section className="month-details">
            <MonthHeader month={month}
                addCtegory={addCtegory}
                onPrevNextMonth={onPrevNextMonth} />
            <main className='month-main'>
                {month.categories && <CategoryList
                    updateMonth={updateMonth}
                    categories={month.categories}
                    updateCtegory={updateCtegory}
                    deleteCategory={deleteCategory}
                    addExpense={addExpense}
                    updateExpense={updateExpense}
                    deleteExpense={deleteExpense}
                    cols={cols}
                    updateLabel={updateLabel}
                    removeLabel={removeLabel} />}
            </main>
            {/* <Switch>
                <Route path={`${props.match.path}/:expenseId`} > <ExpenseDetails /> </Route>
            </Switch> */}
        </section>
    )
}