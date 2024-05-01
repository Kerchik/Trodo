import axios from 'axios'

const API_PREFIX = '/api';

export const getCurrencies = async (target: string, page: number, order: string) => {
    try {
        const result = await axios.get(`${API_PREFIX}/currencies`, {
            params: {
                target: target,
                page: page,
                order: order
            }
        })

        return {
            data: result.data.currencies.data,
            pagination: {
                currentPage: result.data.currencies.current_page,
                lastPage: result.data.currencies.last_page
            },
            lastUpdate: result.data.lastUpdate,
            maxValue: result.data.maxValue,
            minValue: result.data.minValue,
            avgValue: result.data.avgValue,
        }
    } catch (error) {
        return {
            data: [],
            pagination: {
                currentPage: null,
                lastPage: null
            },
            lastUpdate: null,
            maxValue: null,
            minValue: null,
            avgValue: null,
        }
    }
}