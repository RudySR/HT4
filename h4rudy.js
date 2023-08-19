const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const students = {};

function showMenu() {
  console.log('Seleccione una opción:');
  console.log('1. Agregar Estudiante');
  console.log('2. Buscar Estudiante por Carnet');
  console.log('3. Generar Resumen');
  console.log('4. Salir');
  rl.question('Opción: ', option => {
    switch (option) {
      case '1':
        addStudent();
        break;
      case '2':
        searchStudentByCarnet();
        break;
      case '3':
        generateSummary();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Opción no válida. Seleccione una opción válida.');
        showMenu();
    }
  });
}

function addStudent() {
  rl.question('Ingrese el carnet del estudiante: ', carnet => {
    rl.question('Ingrese el nombre del estudiante: ', name => {
      students[carnet] = { name, tasks: [] };
      addTask(carnet);
    });
  });
}

function addTask(carnet) {
  rl.question('Ingrese el nombre de la tarea: ', taskName => {
    rl.question('Ingrese la nota para la tarea: ', note => {
      students[carnet].tasks.push({ taskName, note: parseFloat(note) });
      rl.question('¿Desea agregar otra tarea? (S/N): ', answer => {
        if (answer.toLowerCase() === 's') {
          addTask(carnet);
        } else {
          showMenu();
        }
      });
    });
  });
}

function searchStudentByCarnet() {
  rl.question('Ingrese el carnet del estudiante que desea buscar: ', carnet => {
    const student = students[carnet];
    if (student) {
      console.log(`Carnet: ${carnet}`);
      console.log(`Nombre: ${student.name}`);
      console.log('Notas:');
      student.tasks.forEach(task => {
        console.log(`- Tarea: ${task.taskName}, Nota: ${task.note}`);
      });
    } else {
      console.log(`No se encontró ningún estudiante con el carnet ${carnet}`);
    }
    rl.question('\n¿Desea buscar otro estudiante por carnet? (S/N): ', answer => {
      if (answer.toLowerCase() === 's') {
        searchStudentByCarnet();
      } else {
        showMenu();
      }
    });
  });
}

function generateSummary() {
  console.log('\nResumen de Notas:\n');
  for (const carnet in students) {
    console.log(`Carnet: ${carnet}`);
    console.log(`Nombre: ${students[carnet].name}`);
    console.log('Notas:');
    students[carnet].tasks.forEach(task => {
      console.log(`- Tarea: ${task.taskName}, Nota: ${task.note}`);
    });
    console.log('\n');
  }
  showMenu();
}

console.log('Bienvenido al sistema de control de notas.\n');
showMenu();

