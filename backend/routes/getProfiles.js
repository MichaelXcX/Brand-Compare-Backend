const axios = require("axios");
const express = require("express");

const router = express.Router();

router.post("/", async(req, res) => {
    const { profiles, date } = req.body;
    console.log(profiles);

    let get_profiles_data = profiles.map((profile) => {
        return JSON.stringify({
            "id": 1,
            "method": "socialinsider_api.get_profile_data",
            "params": {
                "id": profile.id,
                "profile_type": profile.profile_type,
                "date": date
            }
        });
    });
    let config_profiles = get_profiles_data.map((profile) => {
        return {
            method: 'post',
            url: 'https://app.socialinsider.io/api',
            headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer API_KEY_TEST'
            },
            data: profile
        }
    });

    let profile_data = await Promise.all(config_profiles.map(async (config_profile) => {
            const fetchProfile = async () => {
                try {
                    let pres = await axios(config_profile)
                    let pdata = await pres.data;
                    return await pdata;
                }
                catch(err) {
                    console.error(err);
                }
            }
            return fetchProfile()
        })
    )    
    
    let engagement = 0, fans = 0;
    profile_data.map((profile) => {
        if(profile.resp !== undefined) {
            for(const [key, value] of Object.entries(profile.resp)) {
                for(const [pkey, pvalue] of Object.entries(value)) {
                    if(pvalue.engagement !== undefined && pvalue.followers !== undefined) {
                        engagement += pvalue.engagement;
                        fans += pvalue.followers;
                    }
                }
            }
        }
    })

    try {
        res.status(200).send({engagement, fans});
        // res.status(200).send(profile_data);

    }
    catch(err) {
        res.status(500).send({error: "Server error!"})
    }
});

module.exports = router;