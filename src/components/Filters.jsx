import React, { useId } from 'react'
import '../styles/Filters.css'
import { useFilters } from '../hooks/useFilters';

export default function Filters() {
    const { filters, setFilters } = useFilters();
    const minPriceFilterId = useId();
    const categoryFilterId = useId();

    const handleChangeMinPrice = (e) => {
        setFilters(prev => ({
            ...prev,
            minPrice: e.target.value
        }))
    }
    const handleChangeCategory = (e) => {
        setFilters(prev => ({
            ...prev,
            category: e.target.value
        }))
    }
    return (
        <section className='filters'>
            <div>
                <label htmlFor={minPriceFilterId}>Precio Inicial</label>
                <input type="range" name="price" id={minPriceFilterId} min={0} max={1000} onChange={handleChangeMinPrice} value={filters.minPrice} />
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categoria</label>
                <select name="category" id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="laptops">Portatiles</option>
                    <option value="smartphones">Celulares</option>
                </select>
            </div>
        </section>
    )
}
