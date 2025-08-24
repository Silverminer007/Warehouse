// composables/kiosk/useKioskBoxes.ts
import {computed, ref} from 'vue'
import type {Box} from '@/types/inventory'

export async function useKioskBoxes() {
    const config = useRuntimeConfig()
    const DIRECTUS_URL = config.public.directusUrl

    const kioskBoxes = ref<Box[]>([])
    const allBoxes = ref<Box[]>([])
    const searchTerm = ref('')

    // interne Funktion zum Laden der Boxen
    const loadKioskBoxes = async () => {
        try {
            const rawData = await fetch(`${DIRECTUS_URL}/items/Box?filter[kiosk][_eq]=true`)
            if (!rawData.ok) {
                console.error('Failed to get kiosk boxes')
                kioskBoxes.value = []
                return
            }
            const data = await rawData.json()
            kioskBoxes.value = data.data as Box[]
        } catch (error) {
            console.error('Error loading kiosk boxes:', error)
            kioskBoxes.value = []
        }
    }

    const loadAllBoxes = async () => {
        try {
            const rawData = await fetch(`${DIRECTUS_URL}/items/Box`)
            if (!rawData.ok) {
                console.error('Failed to get kiosk boxes')
                kioskBoxes.value = []
                return
            }
            const data = await rawData.json()
            allBoxes.value = data.data as Box[]
        } catch (error) {
            console.error('Error loading boxes:', error)
            allBoxes.value = []
        }
    }

    const filteredBoxes = computed(() =>
        allBoxes.value
            .filter(b => !kioskBoxes.value.map(b1 => b1.id).includes(b.id))
            .filter(b =>
                b.name.toLowerCase().includes(searchTerm.value.toLowerCase())
                || searchTerm.value.toLowerCase().includes(b.name.toLowerCase()))
    )

    const addBoxToKiosk = async (box: Box) => {
        try {
            const response = await fetch(`${DIRECTUS_URL}/items/Box/${box.id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({kiosk: true}),
            })
            if (response.ok) {
                kioskBoxes.value.push(box);
            }
        } catch (error) {
            console.error('Error adding box to kiosk:', error)
        }
    }

    const removeBox = async (box: Box) => {
        const response = await fetch(`${DIRECTUS_URL}/items/Box/${box.id}`, {
            method: 'PATCH',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({kiosk: false}),
        })
        if (response.ok) {
            kioskBoxes.value = kioskBoxes.value.filter(b => b.id !== box.id)
        }
        await loadBoxes()
    }

    async function loadBoxes() {
        await loadKioskBoxes()
        await loadAllBoxes()
    }

    await loadBoxes();

    return {
        kioskBoxes,
        searchTerm,
        filteredBoxes,
        loadBoxes,
        addBoxToKiosk,
        removeBox,
    }
}