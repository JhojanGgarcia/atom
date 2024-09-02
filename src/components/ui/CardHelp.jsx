
export default function CardHelp({ children, onClick }) {
  return (
    <div className="flex items-center relative justify-center overflow-hidden">
        <div className="absolute w-14 h-14 z-10 top-0 left-0 bg-white blur-3xl opacity-80" />
        <div className="absolute w-14 h-14 bottom-0 right-0 bg-white blur-3xl opacity-80" />
      <div
        onClick={onClick}
        className="fixed backdrop-blur-xl overflow-auto z-50 max-w-2xl top-20 border-2 border-white/5 bg-[#1a1a1a] text-white flex flex-col p-6 rounded-xl shadow-lg"
        style={{ maxHeight: "80vh" }}
      >

        <h2 className="text-2xl text-white/70 font-semibold mb-4">Introducción.</h2>
        <p className="mb-4 text-white/50">
          Los hornos de inducción son equipos que utilizan la inducción
          electromagnética para calentar materiales metálicos. La corriente
          eléctrica fluye a través de una bobina, generando un campo magnético
          que induce corrientes en el material colocado dentro del horno. Este
          proceso permite calentar el material de manera uniforme y eficiente.
        </p>

        <h2 className="text-2xl text-white/70 font-semibold mb-4">
          Cómo Usar el Editor Atom con IA.
        </h2>
        <p className="mb-4 text-white/50">
          Atom es un editor de texto que te ayuda a gestionar los datos para
          hornos de inducción. Para usar la inteligencia artificial (IA)
          integrada en Atom, sigue estos pasos:
        </p>

        <h2 className="text-2xl font-semibold  text-white/70 mb-4">Campos a Llenar</h2>
        <p className="mb-4 text-white/50">
          Rellena los siguientes campos con los datos relevantes para el
          procesamiento del horno:
          <ul className="list-disc pl-5 mb-4">
            <li className="text-white/50">
              <span className="font-bold text-white/70 ">Tipo de Horno:</span>{" "}
              Selecciona el tipo de horno de inducción que estás usando, como
              Horno de Inducción de Banco, de Pie, o de Fundición.
            </li>
            <li className="text-white/50">
              <span className="font-bold text-white/70">Tipo de Metal:</span>{" "}
              Selecciona el metal que estás fundiendo, como Oro, Plata, Cobre,
              entre otros.
            </li>
            <li className="text-white/50">
              <span className="font-bold text-white/70">Peso:</span> Ingresa el
              peso del metal en gramos.
            </li>
            <li className="text-white/50">
              <span className="font-bold text-white/70">
                Temperatura de Fusión (en °C):
              </span>{" "}
              Ingresa la temperatura de fusión del metal en grados Celsius.
            </li>
            <li className="text-white/50">
              <span className="font-bold text-white/70">
                Nivel de Potencia:
              </span>{" "}
              Ingresa el nivel de potencia del horno en kilovatios (kW).
            </li>
            <li className="text-white/50">
              <span className="font-bold text-white/70">Tiempo de Fusión:</span>{" "}
              Ingresa el tiempo requerido para fundir el metal, ya sea en
              minutos o horas.
            </li>
            <li className="text-white/50">
              <span className="font-bold text-white/70">
                Material del Crisol (En caso de existir):
              </span>{" "}
              Indica el material del crisol, como grafito, piedra, o ladrillo,
              si aplica.
            </li>
          </ul>
          Estos datos son esenciales para que la IA pueda proporcionar cálculos
          y fórmulas precisos relacionados con la operación del horno.
        </p>

        <h2 className="text-2xl text-white/70 font-semibold mb-4">Uso de los Botones.</h2>
        <p className="mb-4 text-white/50">
          Para interactuar con la IA, utiliza los siguientes botones:
          <ul className="list-disc pl-5 mb-4 ">
            <li>
              <span className="font-bold text-white/70">Empezar:</span> Al hacer
              clic en este botón, la IA procesará los datos que has ingresado y
              generará fórmulas y cálculos específicos para el horno de
              inducción. Asegúrate de que todos los campos estén correctamente
              llenos antes de hacer clic en &quot;Empezar&quot;.
            </li>
            <li>
              <span className="font-bold text-white/70">Limpiar:</span> Este
              botón restablecerá todos los campos a sus valores iniciales y
              también reiniciará la IA. Esto te permitirá empezar de nuevo con
              datos frescos sin tener que recargar la página.
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
}
