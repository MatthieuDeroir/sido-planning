export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  try{
    const upstream=await fetch('https://website-54848.eventmaker.io/api/graphql?locale=fr&event_id=69aaf6cb5d90ce3fcd4aac97',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(req.body)});
    res.status(upstream.status).json(await upstream.json());
  }catch(error){res.status(502).json({error:error.message})}
}
