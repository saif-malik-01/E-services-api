const Company = require('../models/company');
const Workshop = require('../models/workshop');
module.exports.createWorkshop = async (req,res)=>{
    if(!req.company){
        return res.json('not permitted');
    }
    let company = await Company.find(req.company);
    if(!company){
        return res.json('not permitted');
    }
    const {date,category,name,price} = req.body;

    let workshop = await Workshop.create({
        workshop_Name:name,
        company:company._id,
        category:category,
        date:date,
        price:price
    });

    company.Workshops.push(workshop._id);
    company.save();
    return res.json('successfully created workshop');

}

module.exports.deleteWorkshop = async (req,res)=>{
    let workshop=await Workshop.findById(req.params.id);
        
    if(workshop)
    {
            
            let company = await Company.findById(workshop.company);
            
            let companyId=company.id;
            
            if(req.company==companyId)
            {
                
                
                workshop.remove();

                await Company.findByIdAndUpdate(companyId,{$pull: {Workshops:req.params.id}})
                return res.json('Success')
                
            }
            else
            {
                return res.json('fail');
            }
        
        
    }
    else{
        return res.json('workshop not found');
    }

}
