// Base a ser utilizada
const alunosDaEscola=[
    {nome:"Henrique",notas:[],cursos:[],faltas:5},
    {nome:"Edson",notas:[],cursos:[],faltas:2},
    {nome:"Bruno",notas:[10,9.8,9.6],cursos:[],faltas:0},
    {nome:"Guilherme",notas:[10,9.8,9.6],cursos:[{nomeDoCurso:"Full Stack",dataMatricula:new Date}],faltas:0},
    {nome:"Carlos",notas:[],cursos:[],faltas:0},
    {nome:"Lucca",notas:[10,9.8,9.6],cursos:[{nomeDoCurso:"UX",dataMatricula:new Date}],faltas:0}
];

 const 
    msginfo    = ";) Aluno: ", 
    msgSuccess = ":) Aluno Adicionado com sucesso! ", 
    msgError   = ":( Ops... Aluno não cadastrado! ",
    msgErrorCheck = ":( Ops... Aluno ja cadastrado! ",
    marcacao   = "-".repeat(120);

const alunoExiste = valor => (alunosDaEscola.findIndex(x => x.nome == valor));
const cursoExiste = valor => (alunosDaEscola[valor].cursos[0] !== undefined );
const mediaNotas  = notas => notas.reduce((soma, elem) => soma + elem, 0) / notas.length;

// const pegarKeys = () => (Object.keys(alunosDaEscola[0]));
//[ 'nome', 'notas', 'cursos', 'faltas' ]

const buscarAluno = nomeAluno => {
    let busca = alunosDaEscola.find(x => x.nome == nomeDoAluno);
    return (busca) ? msginfo + busca : msgError;
}

// console.lo(buscarAluno("Bruno"));
// console.lo(buscarAluno("Pedro"));

const adicionarAluno = nomeAluno => { 
    const modeloAluno = {nome:nomeAluno,notas:[],cursos:[],faltas:0};  
    let msgAtual = msgSuccess;
    (alunoExiste(nomeAluno) !== -1) 
        ? msgAtual = msgErrorCheck
        : alunosDaEscola.push(modeloAluno);
    return msgAtual;
}

// console.log(adicionarAluno("Henrique"));
// console.log(adicionarAluno("Pedro"));
// console.log(adicionarAluno("Bruno Old"));
//console.log(alunosDaEscola);

const listarAlunos = ()=> {
    let inicioEFim = `${("-".repeat(105))} \n`, lista = inicioEFim;
    for (const aluno of alunosDaEscola) {
        lista += `Nome: ${aluno.nome} ${"-".repeat(12-aluno.nome.length)} | `;                 
        lista += `Notas: ${aluno.notas} ${"-".repeat(15-JSON.stringify(aluno.notas).length)} | `;
        lista += `Faltas: ${aluno.faltas} ${"-".repeat(3-JSON.stringify(aluno.faltas).length)} |`;

        for (const curso of aluno.cursos) {
            lista += ` Curso: ${curso.nomeDoCurso} ${"-".repeat(15-curso.nomeDoCurso.length)} | `;  
            lista += `Data: ${curso.dataMatricula.toLocaleDateString()}`;  
        } 

        lista += `\n`;
    }
    return console.log(lista += inicioEFim);
}

// console.log(listarAlunos());

const matricularAluno = (nomeAluno, curso)=> { 
    let msgAtual = `Aluno ${nomeAluno} Matriculado com sucesso em ${curso}`;
    let i = alunoExiste(nomeAluno);

    (i == -1) 
        ? msgAtual = msgError
        : alunosDaEscola[i].cursos.push({ nomeDoCurso: curso, dataMatricula: new Date });
    
    return msgAtual;
}

//  console.log(matricularAluno("Pedro","Artes"));
//  console.log(matricularAluno("Bruno","Artes"));

const aplicarFalta = (nomeAluno)=> {
    let msgAtual = `Aluno ${nomeAluno} recebeu falta! \n`;
    let i = alunoExiste(nomeAluno);
    let matricula = (i !== -1 ) ? cursoExiste(i) : false;

    (i == -1) 
        ? msgAtual = msgError 
        : (!matricula) 
            ? msgAtual = `Aluno: ${nomeAluno} não está matriculado em nenhum curso`
            : alunosDaEscola[i].faltas += 1;
   
    return msgAtual;
}

// console.log(aplicarFalta("Bruno"));
// console.log(aplicarFalta("Pedro"));
// console.log(aplicarFalta("Lucca"));

const aplicarNota = (nomeAluno, nota)=> {
    let msgAtual = `Aluno ${nomeAluno} recebeu a Nota ${nota}! \n`;
    let i = alunoExiste(nomeAluno);
    let matricula = (i !== -1 ) ? cursoExiste(i) : false;

    (i == -1) 
        ? msgAtual = msgError 
        : (!matricula) 
            ? msgAtual = `Aluno: ${nomeAluno} não está matriculado em nenhum curso`
            : alunosDaEscola[i].notas.push(nota);
   
    return msgAtual;
}

// console.log(aplicarNota("Bruno", 8));
// console.log(aplicarNota("Pedro", 8));
// console.log(aplicarNota("Lucca", 8));


const aprovarAluno = (nomeAluno)=> {
    let msgAtual = msgError;
    let i = alunoExiste(nomeAluno);

    if (i == -1) return msgAtual;

    let matricula = (i !== -1 ) ? cursoExiste(i) : false;
   
    let media = (mediaNotas(alunosDaEscola[i].notas)).toFixed(2);
    let qtdeFaltas = alunosDaEscola[i].faltas;

    (!matricula) 
        ? msgAtual = `Aluno: ${nomeAluno} não está matriculado em nenhum curso`
        : (media >= 7 && qtdeFaltas <= 3)
            ? msgAtual = `Aluno: ${nomeAluno} APROVADO!`
            : msgAtual = `Aluno: ${nomeAluno} REPROVADO!`;

    return msgAtual;
  };
  
//   console.log(aprovarAluno('Pedro'));
//   console.log(aprovarAluno('Bruno'));
  console.log(aprovarAluno('Guilherme'));