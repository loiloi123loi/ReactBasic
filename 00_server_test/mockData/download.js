const fs = require('fs');
const axios = require('axios');

const downSave = async (url, name) => {
    await axios.get(url).then((res) => {
        write(name, res.data);
    });
};

const write = (name, json) => {
    fs.writeFile(name, JSON.stringify(json), 'utf8', () => {});
};

const down = () => {
    downSave('https://reqres.in/api/users?page=1', 'mockData/users1.json');
    downSave('https://reqres.in/api/users?page=2', 'mockData/users2.json');

    console.log('=== download OK ===');
};

down();
