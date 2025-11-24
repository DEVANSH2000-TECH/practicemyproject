import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:1234",
    headers:{"Content-Type":"application/json"}
});

export const ExpenseService={
    getAll:()=>api.get("/exp").then(r=>r.data),
    getById:(id)=>api.get(`/exp/${id}`).then(r=>r.data),
    create:(payload)=>api.post("/exp",payload).then(r=>r.data),
    update:(payload,id)=>api.put(`/exp/${id}`,payload).then(r=>r.data),
    remove:(id)=>api.delete(`/exp/${id}`)
}