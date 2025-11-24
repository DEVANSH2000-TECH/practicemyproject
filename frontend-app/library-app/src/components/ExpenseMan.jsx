import React,{useEffect,useState} from "react";
import { ExpenseService } from "../services/expenseservice";

export default function Expense(){
    const[expenses,setExpenses]=useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const[form,setForm]=useState({
        id:0,
        amount:"",
        category:"",
        description:"",
        expense_date:""
    });

    useEffect(()=>{
        loadData();
    },[]);

    const loadData = async()=>{
        setIsLoading(true);
        const data=await ExpenseService.getAll();
        setExpenses(data);
        setIsLoading(false);
    };

    const handleChange =e=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit =async e=>{
        e.preventDefault();

        if(form.id===0){
            await ExpenseService.create({
                amount:parseFloat(form.amount),
                category:form.category,
                description:form.description,
                expense_date:form.expense_date
            });
        }else{
            await ExpenseService.update(
                {
                amount:parseFloat(form.amount),
                category:form.category,
                description:form.description,
                expense_date:form.expense_date 
                },
                form.id
            );
        };
        setForm({
            id:0,
            amount:"",
            category:"",
            description:"",
            expense_date:""
        });
        loadData();

    };


    const editRecord =e=>{
        setForm({
            ...e,
            amount:parseFloat(e.amount).toFixed(2),
            expense_date:String(e.expense_date).slice(0,10)
        });
    };

    const deleteRecord =async id=>{
        const confirmDelete=window.confirm("Do u really want to delete thus item?");

        if(!confirmDelete){
            return;
        }

        await ExpenseService.remove(id);
        loadData();
    };


    return(
        <div className="app">
            <h1>Expense Management System</h1>

            <button type="button" onClick={loadData}>🔃REFRESH</button>

            <form onSubmit={handleSubmit}>
                <input 
                 name="amount"
                 placeholder="AMOUNT"
                 value={form.amount}
                 type="number"
                 step="0.01"
                 min="0"
                 onChange={handleChange}
                 required
                />

                <input 
                 name="category"
                 placeholder="CATEGORY"
                 value={form.category}
                 onChange={handleChange}
                 required
                />

                <input 
                 name="description"
                 placeholder="DESCRIPTION"
                 value={form.description}
                 onChange={handleChange}
                 required
                />

                <input 
                 name="expense_date"
                 placeholder="DATE"
                 onChange={handleChange}
                 type="date"
                 value={form.expense_date}
                 required
                />

                <div className="form-buttons">

                <button type="submit">
                    {form.id===0?"ADD":"UPDATE"}
                </button>

                <button type="button" onClick={()=>setForm({
                    id:0,
                    amount:"",
                    category:"",
                    description:"",
                    expense_date:""
                })}>CANCEL</button>

                </div>
            </form>


            {isLoading && <span>LOADING...</span>}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>AMOUNT</th>
                        <th>CATEGORY</th>
                        <th>DESCRIPTION</th>
                        <th>DATE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {expenses.map(c=>(
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.amount}</td>
                            <td>{c.category}</td>
                            <td>{c.description}</td>
                            <td>{c.expense_date?String(c.expense_date).slice(0,10):"-"}</td>
                            <td>
                                <button onClick={()=>editRecord(c)}>🖊️</button>
                                <button onClick={()=>deleteRecord(c.id)}>❌</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );



}