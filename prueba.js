const baseUrl = 'https://api-colombia.com/api/v1/';

async function getPresidents() {
    try {
        const response = await fetch(`${baseUrl}President`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log('Presidentes:', data);
    } catch (error) {
        console.error('Error al obtener presidentes:', error);
    }
}
async function getAirport(){
    try {
        const response= await fetch(`${baseUrl}Airport`);
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const data= await response.json();
        console.log("Aeropuertos:",data);
    } catch (error) {
        console.error("Error al obterner aeropuertos:", error);
    }
}
async function getTouristicAttraction() {
    try {
        const response = await fetch(`${baseUrl}TouristicAttraction`)
            if(!response.ok){
                throw new Error(`Error: ${response.status}`);   
        }
        const data= await response.json();
        console.log("Atracciones Turisticas",data);
    } catch (error) {
        console.error("Error al obterner atracciones turisticas",error);
    }
}

//getPresidents();
//getAirport()
//getTouristicAttraction()
async function groupPresidentsByParty() {
    const response = await fetch(`${baseUrl}President`);
    const presidents = await response.json();

    const groupedByParty = presidents.reduce((acc, president) => {
        const party = president.politicalParty || 'Unknown';
        if (!acc[party]) {
            acc[party] = {
                party,
                count: 0,
                presidents: []
            };
        }
        acc[party].count += 1;
        acc[party].presidents.push(`${president.name} ${president.lastName}`);
        return acc;
    }, {});

    // Convertir el objeto en un array y ordenar por el conteo descendente
    const sortedParties = Object.values(groupedByParty).sort((a, b) => b.count - a.count);

    console.log(sortedParties);
    return sortedParties;
}

//groupPresidentsByParty();

async function fetchDepartments() {
    const response = await fetch('https://api-colombia.com/api/v1/Department');
    const departments = await response.json();
    return departments.reduce((map, department) => {
        map[department.id] = department.name;
        return map;
    }, {});
}
async function fetchTouristicAttractions() {
    const response = await fetch('https://api-colombia.com/api/v1/TouristicAttraction');
    const attractions = await response.json();
    return attractions;
}
async function groupTouristicAttractionsByDepartmentCity() {
    // Obtener datos de departamentos y atracciones turísticas
    const [departments, attractions] = await Promise.all([
        fetchDepartments(),
        fetchTouristicAttractions()
    ]);

    // Agrupar atracciones por departamento y ciudad
    const groupedByDepartmentCity = attractions.reduce((acc, attraction) => {
        const city = attraction.city?.name || 'Unknown City';
        const departmentId = attraction.city?.departmentId || 'Unknown DepartmentId';
        const department = departments[departmentId] || 'Unknown Department';

        // Crear una estructura con la etiqueta "departamento:" para el nombre del departamento
        if (!acc[`departamento: ${department}`]) {
            acc[`departamento: ${department}`] = {};
        }
        if (!acc[`departamento: ${department}`][`ciudad: ${city}`]) {
            acc[`departamento: ${department}`][`ciudad: ${city}`] = {
                count: 0,
                attractions: []
            };
        }
        acc[`departamento: ${department}`][`ciudad: ${city}`].count += 1;
        acc[`departamento: ${department}`][`ciudad: ${city}`].attractions.push(attraction.name); // Solo agregar el nombre de la atracción
        return acc;
    }, {});

    // Mostrar los datos agrupados
    console.log(JSON.stringify(groupedByDepartmentCity, null, 2));
    return groupedByDepartmentCity;
}

//groupTouristicAttractionsByDepartmentCity();

async function fetchDepartments() {
    const response = await fetch('https://api-colombia.com/api/v1/Department');
    const departments = await response.json();
    return departments.reduce((map, department) => {
        map[department.id] = department.name;
        return map;
    }, {});
}
async function fetchAirports() {
    const response = await fetch('https://api-colombia.com/api/v1/Airport');
    const airports = await response.json();
    return airports;
}
async function groupAirportByDepartmentCity() {
    // Obtener datos de departamentos y atracciones turísticas
    const [departments, airports] = await Promise.all([
        fetchDepartments(),
        fetchAirports()
    ]);

    // Agrupar atracciones por departamento y ciudad
    const groupedByDepartmentCity = airports.reduce((acc, airport) => {
        const city = airport.city?.name || 'Unknown City';
        const departmentId = airport.city?.departmentId || 'Unknown DepartmentId';
        const department = departments[departmentId] || 'Unknown Department';

        // Crear una estructura con la etiqueta "departamento:" para el nombre del departamento
        if (!acc[`departamento: ${department}`]) {
            acc[`departamento: ${department}`] = {};
        }
        if (!acc[`departamento: ${department}`][`ciudad: ${city}`]) {
            acc[`departamento: ${department}`][`ciudad: ${city}`] = {
                count: 0,
                airports: []
            };
        }
        acc[`departamento: ${department}`][`ciudad: ${city}`].count += 1;
        acc[`departamento: ${department}`][`ciudad: ${city}`].airports.push(airport.name); // Solo agregar el nombre de la atracción
        return acc;
    }, {});

    // Mostrar los datos agrupados
    console.log(JSON.stringify(groupedByDepartmentCity, null, 2));
    return groupedByDepartmentCity;
}

//groupAirportByDepartmentCity()
//////////////////////////
async function fetchRegions() {
    const response = await fetch('https://api-colombia.com/api/v1/Region');
    const regions = await response.json();
    return regions.reduce((map, region) => {
        map[region.id] = region.name;
        return map;
    }, {});
}


async function groupAirportsByRegionDepartmentCityType() {
    // Obtener datos de departamentos y atracciones turísticas
    const [regions, airports] = await Promise.all([
        fetchRegions(),
        fetchAirports()
    ]);

    // Agrupar aeropuertos por departamento y ciudad
    const groupedByRegionDeptCityType = airports.reduce((acc, airport) => {
        const department = airport.department?.name || 'Unknown department';
        const city = airport.city?.name || 'Unknown City';
        const type = airport.type || 'Unknown Type';
        const regionId = airport.department?.regionId || 'Unknown RegionId';
        const region = regions[regionId] || 'Unknown Region';

        // Crear una estructura con la etiqueta "departamento:" para el nombre del departamento
        if (!acc[`region: ${region}`]) {
            acc[`region: ${region}`] = {};
        }
        if (!acc[`region: ${region}`][`departamento: ${department}`]) {
            acc[`region: ${region}`][`departamento: ${department}`] = {};
        }
        if (!acc[`region: ${region}`][`departamento: ${department}`][`ciudad: ${city}`]) {
            acc[`region: ${region}`][`departamento: ${department}`] [`ciudad: ${city}`]= {
                tipo:{}
            };
        }
        if (!acc[`region: ${region}`][`departamento: ${department}`][`ciudad: ${city}`].tipo[type]) {
            acc[`region: ${region}`] [`departamento: ${department}`][`ciudad: ${city}`].tipo[type] = 0;
        }
        acc[`region: ${region}`] [`departamento: ${department}`][`ciudad: ${city}`].tipo[type] += 1;
        return acc;
    }, {});

    // Mostrar los datos agrupados
    console.log(JSON.stringify(groupedByRegionDeptCityType, null, 2));
    return groupedByRegionDeptCityType;
}



groupAirportsByRegionDepartmentCityType();
