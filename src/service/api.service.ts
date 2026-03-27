export const URL: string = 'https://69b54a87be587338e715826e.mockapi.io';


///////// apilarni olish
export async function apiGet<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${URL}/${endpoint}`);
    if (!res.ok) throw new Error(`Api xatosi: ${res.status}`);
    return res.json() as Promise<T>;
}


//////// new api add
export async function apiPost<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Api xatosi: ${res.status}`);
    return res.json() as Promise<T>;
}



/////// api remove
export async function apiDelete(endpoint: string, id: string): Promise<void> {
    const res = await fetch(`${URL}/${endpoint}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error(`O'chirishda xato: ${res.status}`);
}



///////// api edit
export async function apiPut<T>(endpoint: string, id: string, body: any): Promise<T> {
    const res = await fetch(`${URL}/${endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return res.json();
}