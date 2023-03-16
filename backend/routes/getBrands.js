const axios = require("axios");
const express = require("express");
const options = require("../config")

const router = express.Router();

router.get("/", async (req, res) => {
    let brands_res = await axios(options.config_brands);
    let data = await brands_res.data;
    
    //extract from the api request the profiles with name and id
    let brands = Array.isArray(data.result) ? data.result.map((brand) => {
        let filtered_profiles = brand.profiles.map((elem) => {
            return {
                name: elem.name,
                id: elem.id,
                profile_type: elem.profile_type           
            }
        })
        return {
            total_profiles: brand.profiles.length,
            brand_name: brand.profiles[0].name,
            profiles: filtered_profiles
        }
    }) : [];

    
    try {
        res.status(200).send(brands);
    }
    catch(err) {
        res.status(500).send({error: "Server error!"})
    }
})

module.exports = router;