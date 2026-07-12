import Resume from "../models/Resume.js";
import ai from "../configs/ai.js"

//controller for enhancing a resume's  professional summary
// POST: /api/ai/enhance-pro-sum


export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if(!userContent){
            return res.status(400).json({message: 'Missing required fields'})
        }

        const response =  await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You are an expert in resume writing. Your task is to enhance the professional summary of resume. The summary should be 1-2 sentences also hignlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or any thing else."},
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })
        const enhanceContent = response.choices[0].message.content;
        return res.status(200).json({enhanceContent})
    } catch(error){
        return res.status(400).json({message: error.message})
    }
}

//controller for enchance a resume's job description
//POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if(!userContent){
            return res.status(400).json({message: 'Missing required fields'})
        }

        const response =  await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", 
                    content: "You are an expert in resume writing. Your task is to enhance the job description of resume. The job description should be only in 1-2 sentences also hignlighting key responsibilities and achivement. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else."},
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })
        const enhanceContent = response.choices[0].message.content;
        return res.status(200).json({enhanceContent})
    } catch(error){
        return res.status(400).json({message: error.message})
    }
}

//controller for uploading a resume to the database
//POST: /api/ai/upload-resume
export const uploadResume = async (req,res)=>{
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if(!resumeText || !title){
            return res.status(400).json({message: 'Missing required fields'})
        }
        
        const systemPrompt = "You are an expert AI Agent to extract data from resume."
        const userPrompt = `
Extract data from this resume:

${resumeText}

Return ONLY valid JSON in this exact format. Do not add extra text.

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}
`;
    
        console.log("AI MODEL:", process.env.OPENAI_MODEL);
        let response;

for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    break; // success, stop retrying
  } catch (error) {
    console.log(`AI attempt ${attempt} failed:`, error.message);

    if (attempt === 3) {
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
        const extractedData = response.choices[0].message.content;
        console.log("AI extracted data:", extractedData);

        let cleanJson = extractedData.trim();

cleanJson = cleanJson
  .replace(/^```json/, "")
  .replace(/^```/, "")
  .replace(/```$/, "")
  .trim();

const parsedData = JSON.parse(cleanJson);
        const newResume = await Resume.create({
  userId,
  title,
  professional_summary: parsedData.professional_summary || "",
  skills: parsedData.skills || [],
  personal_info: parsedData.personal_info || {},
  experience: parsedData.experience || [],
  project: parsedData.project || [],
  education: parsedData.education || [],
});
        res.json({resumeId: newResume._id})
    } 
  catch (error) {
  console.log("Upload resume error:", error);

  return res.status(error.status || 400).json({
    message: error.message || "Upload resume failed"
  });
}
    
}