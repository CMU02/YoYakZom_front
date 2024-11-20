import React from 'react';
import Category from './Category';

export default function Categories({ categories }) {
    return (
        <>
            <nav className='nav-container'>
                {
                    categories.map(({category, count}) => {
                        return (
                            <Category category={category} count={count} key={category}/>
                        )
                    })
                }
            </nav>
        </>
    )
}