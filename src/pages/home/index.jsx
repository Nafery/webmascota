import Navbar from '../../components/navbar';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center py-20 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">
                    Bienvenido a <span className="text-blue-600">Mascota Feliz Web</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    ¡La mejor plataforma de tu clínica veterinaria de confianza!
                </p>
                <p className="text-md text-gray-500">
                    Disfruta de nuestra aplicación fácil de usar para agendar tu consulta, revisar el historial de tu mascota y mucho más.
                </p>
            </div>
        </div>
    );
};

export default Home;
