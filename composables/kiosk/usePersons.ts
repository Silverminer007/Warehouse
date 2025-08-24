import {ref} from 'vue'
import type {Person} from '@/types/kiosk'

export function usePersons() {
    const config = useRuntimeConfig()
    const DIRECTUS_URL = config.public.directusUrl

    const persons = ref<Person[]>([])

    // Load all persons
    const loadPersons = async () => {
        try {
            const res = await fetch(`${DIRECTUS_URL}/items/person`)
            if (!res.ok) throw new Error('Failed to fetch persons')
            const data = await res.json()
            persons.value = data.data as Person[]
        } catch (err) {
            console.error(err)
            persons.value = []
        }
    }

    // Add a new person
    const addPerson = async (firstname : string, lastname : string, balance : number) => {
        try {
            const res = await fetch(`${DIRECTUS_URL}/items/person`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    balance: balance,
                }),
            })
            if (!res.ok) throw new Error('Failed to add person')

            await loadPersons()
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }

    // Remove a person
    const removePerson = async (personId: number) => {
        try {
            const res = await fetch(`${DIRECTUS_URL}/items/person/${personId}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            })
            if (!res.ok) throw new Error('Failed to remove person')
            persons.value = persons.value.filter(p => p.id !== personId)
        } catch (err) {
            console.error(err)
        }
    }

    return {
        persons,
        loadPersons,
        addPerson,
        removePerson,
    }
}