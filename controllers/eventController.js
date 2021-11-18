const Company = require('../models/company');
const Event = require('../models/event');
module.exports.createEvent = async (req,res)=>{
    if(!req.company){
        return res.json('not permitted');
    }
    let company = await Company.find(req.company);
    if(!company){
        return res.json('not permitted');
    }
    const {date,category,name} = req.body;

    let event = await Event.create({
        event_Name:name,
        company:company._id,
        category:category,
        date:date
    });

    company.Events.push(event._id);
    company.save();
    return res.json('successfully created event');

}

module.exports.deleteEvent = async (req,res)=>{
    let event=await Event.findById(req.params.id);
        
    if(event)
    {
           
            let company = await Company.findById(event.company);
            
            let companyId=company.id;
            
            if(req.company==companyId)
            {
               
                
                event.remove();

                await Company.findByIdAndUpdate(companyId,{$pull: {Events:req.params.id}})
                return res.json('Success')
                
            }
            else
            {
                return res.json('fail');
            }
        
        
    }
    else{
        return res.json('event not found');
    }

}


module.exports.enroll=async (req,res)=>{
    const {userId} = req.params;
    const {eventId} = req.body;
    let user = await user.findById(userId);
    let event= await Event.findById(eventId);
    event.participants.push(user._id);
    event.save();
    return res.json('success');
}

module.exports.unenroll=async (req,res)=>{
    const {userId} = req.params;
    const {eventId} = req.body;
    let user = await user.findById(userId);
    let event= await Event.findById(eventId);
    await event.findByIdAndUpdate(event._id,{$pull: {userId}});
    event.save();
    return res.json('success');
}