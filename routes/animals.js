const ash = require('express-async-handler');
const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

router.get('/', ash(async function(req, res, next) {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = now.getMonth();
  const year = now.getFullYear();
  const date = `${day}.${month}.${year}`;

  const id = {
    birds: 1,
    mammals: 3,
    marine_mammals: 4,
    reptiles: 6,
    amphibians: 7,
    dragonflies: 8,
    butterflies: 9,
    fishes: 29,
  }
  let animals = [], animal = {};

  const response = await fetch('https://www.faune-france.org/index.php?m_id=1351&content=last_observations_by_page&home=1&backlink=skip&p_c=1&p_cc=-1&sp_DateSynth=' + date + '&sp_DChoice=offset&sp_DOffset=5&sp_SChoice=category&sp_Cat[never]=1&sp_Cat[veryrare]=1&sp_Cat[rare]=1&sp_Cat[unusual]=0&sp_Cat[escaped]=0&sp_Cat[common]=0&sp_Cat[verycommon]=0&sp_PChoice=canton&sp_cC=11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000&sp_FChoice=list&sp_FGraphFormat=auto&sp_FMapFormat=yes&sp_FDisplay=DATE_PLACE_SPECIES&sp_FOrder=ALPHA&sp_FOrderListSpecies=ALPHA&sp_FListSpeciesChoice=DATA&sp_FOrderSynth=ALPHA&sp_FGraphChoice=DATA&sp_DFormat=DESC&sp_FAltScale=250&sp_FAltChoice=DATA&sp_FExportFormat=XLS&sp_tg=' + id.birds + '&mp_current_page=1');
  let data = await response.json();
  console.log(data);

  if (typeof data !== 'object') {
    res.status(400).send({ error: 'syntax error' });
    return;
  }

  if (data.data.length === 0) {
    res.status(400).send({ error: 'no data found' });
    return;
  }

  data = data.data;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].listSubmenus.length; j++) {
      const get_image = typeof data[i].listSubmenus[j].listObservation[0].opt_media_list === 'object' ? Object.values(data[i].listSubmenus[j].listObservation[0].opt_media_list)[0].full_webpath : 'Default image';

      animals.push({
        id: data[i].listSubmenus[j].listObservation[0].species_array.id,
        name: data[i].listSubmenus[j].listObservation[0].species_array.name,
        image: get_image,
        latitude: data[i].listSubmenus[j].listObservation[0].lat,
        longitude: data[i].listSubmenus[j].listObservation[0].lon
      });
    }
  }

  res.send(animals);
}));

module.exports = router;