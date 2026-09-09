import { createClient } from '@libsql/client';
const db=createClient({url:process.env.TURSO_DATABASE_URL,authToken:process.env.TURSO_AUTH_TOKEN});
export default async function handler(req,res){
  try{
    if(req.method==='GET'){
      const {rows}=await db.execute('SELECT session_id, people FROM assignments');
      return res.status(200).json(Object.fromEntries(rows.map(r=>[r.session_id,JSON.parse(r.people)])));
    }
    if(req.method==='POST'){
      const data=req.body||{};
      await db.batch([
        {sql:'DELETE FROM assignments',args:[]},
        ...Object.entries(data).map(([id,people])=>({sql:'INSERT INTO assignments(session_id,people) VALUES (?,?)',args:[id,JSON.stringify(people)]}))
      ], 'write');
      return res.status(200).json(data);
    }
    res.status(405).json({error:'Method not allowed'});
  }catch(error){res.status(500).json({error:error.message})}
}
