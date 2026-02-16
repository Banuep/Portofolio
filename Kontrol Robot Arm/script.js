const sliders = {
    base: document.getElementById('base'),
    shoulder: document.getElementById('shoulder'),
    elbow: document.getElementById('elbow'),
    gripper: document.getElementById('gripper')
};

const angleDisplays = {
    base: document.getElementById('base-angle'),
    shoulder: document.getElementById('shoulder-angle'),
    elbow: document.getElementById('elbow-angle'),
    gripper: document.getElementById('gripper-angle')
};

// Update angle display
Object.keys(sliders).forEach(joint => {
    sliders[joint].addEventListener('input', (e) => {
        angleDisplays[joint].textContent = `${e.target.value}°`;
        // Tambahkan kode untuk menggerakkan robot arm disini
    });
});

function setPreset(preset) {
    switch(preset) {
        case 'home':
            setAngles(90, 90, 90, 90);
            break;
        case 'pick':
            setAngles(135, 45, 135, 30);
            break;
        case 'release':
            setAngles(135, 45, 135, 150);
            break;
    }
}

function setAngles(base, shoulder, elbow, gripper) {
    sliders.base.value = base;
    sliders.shoulder.value = shoulder;
    sliders.elbow.value = elbow;
    sliders.gripper.value = gripper;
    
    angleDisplays.base.textContent = `${base}°`;
    angleDisplays.shoulder.textContent = `${shoulder}°`;
    angleDisplays.elbow.textContent = `${elbow}°`;
    angleDisplays.gripper.textContent = `${gripper}°`;
}

function emergencyStop() {
    setAngles(90, 90, 90, 90);
    // Tambahkan kode emergency stop disini
}