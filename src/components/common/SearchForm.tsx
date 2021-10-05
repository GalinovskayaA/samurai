import {Formik, Field} from "formik";
import React from "react";
import {FilterType} from "../../redux/UsersReducer";
import {useSelector} from "react-redux";
import {StoreStateType} from "../../redux/redux-store";

type SearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = 'null' | 'true' | 'false'
export type FormType = {
    term: string,
    friend: FriendFormType
}

export const SearchForm = React.memo(({onFilterChanged}: SearchFormPropsType) => {
    const filter = useSelector<StoreStateType, FilterType>(state => state.usersPage.filter)
    const searchFormValidate = (values: any) => {
        const errors = {};
        return errors;
    }
    const onSubmit = (values: FormType) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        onFilterChanged(filter)
    }
    return <>
        <div>
            <h2> Filters </h2>
            <Formik
                enableReinitialize
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
                validate={searchFormValidate}
                onSubmit={onSubmit}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit
                  }) => (
                    <form onSubmit={handleSubmit} className={`row left gap-offset`}>
                        <input
                            type="text"
                            name="term"
                            placeholder="find users"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.term}
                        />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit">
                            Find
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    </>
})