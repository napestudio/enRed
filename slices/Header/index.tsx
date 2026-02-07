import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Image from "next/image";

import { cn } from "@/app/lib/utils";

/**
 * Props for `Header`.
 */
export type HeaderProps = SliceComponentProps<Content.HeaderSlice>;

/**
 * Component for "Header" Slices.
 */

const solucionesData = [
  {
    title: "Redes de protección",
    desc: "Garantizamos la mejor protección en edificios, obras en construcción, domicilios  particulares, estructuras y otros espacios.",
  },
  {
    title: "Instalaciones en altura",
    desc: "Garantizamos la mejor protección en edificios, obras en construcción, domicilios  particulares, estructuras y otros espacios.",
  },
  {
    title: "Impermeabilización y pintura",
    desc: "Garantizamos la mejor protección en edificios, obras en construcción, domicilios  particulares, estructuras y otros espacios.",
  },
  {
    title: "Hidrolavado de muros",
    desc: "Garantizamos la mejor protección en edificios, obras en construcción, domicilios  particulares, estructuras y otros espacios.",
  },
];
const Header: FC<HeaderProps> = ({ slice }) => {
  return (
    <div className="bg-white text-black ">
      {/* Hero */}
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="min-h-screen relative"
      >
        <div className="grid grid-cols-12 gap-4 min-h-screen px-12 py-12 z-10 absolute w-full">
          <div className="col-span-10 col-start-1 lg:col-start-1 lg:col-span-5 flex flex-col justify-start gap-20 py-12">
            <h1 className="text-white text-[clamp(2rem,7vw,7rem)] mt-4 text-balance leading-tight max-w-full">
              Soluciones con <span className="underline">altura</span>
            </h1>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-start-5 col-span-1">
                <Image
                  src="/down-arrow.svg"
                  alt="enRed Logo"
                  className="w-full"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
          <div className="mt-22 col-span-10 col-start-2 lg:col-start-6 lg:col-span-7">
            <Image
              src="/figura-lineas.svg"
              alt="enRed Logo"
              className="w-full h-auto"
              width={600}
              height={600}
            />
          </div>
        </div>
        <Image
          src="/header-bg.jpg"
          alt="Imagen de fondo"
          fill
          className="object-cover"
          priority
        />
      </section>
      {/* Nosotros */}
      <section className="bg-white">
        <div className="relative grid grid-cols-12 gap-4 p-12">
          <div className="col-span-5 col-start-8 text-right text-balance z-20">
            <h2 className="text-5xl mb-6">Nosotros</h2>
            <p className="">
              Somos una empresa que brinda soluciones integrales en edificios,
              obras de construcción, instalaciones industriales, domicilios
              particulares y otros espacios, con más de 6 años de experiencia en
              el rubro. Trabajamos de manera personalizada garantizando
              resultados rápidos y eficientes en cada espacio.
            </p>
          </div>
          <div className="absolute left-0 px-12 -top-20 z-10">
            <Image
              src="/red-solid.svg"
              alt="Imagen de fondo"
              className="w-full h-auto"
              width={400}
              height={500}
              priority
            />
          </div>
        </div>
      </section>
      {/* Soluciones */}
      <section className="bg-white mt-40 min-h-screen">
        <div className="relative px-12 py-12">
          <div className="col-span-5 col-start-1 text-black text-balance z-20">
            <h2 className="text-5xl mb-6">Soluciones</h2>
          </div>
          <div className="relative grid grid-cols-12 gap-4 p-12 max-w-[60vw]">
            {solucionesData.map(
              (solucion: { title: string; desc: string }, index: number) => (
                <div
                  key={index}
                  className={cn(
                    "relative col-span-6 mb-4 p-6",
                    index === 1 ? "bg-red text-white" : "bg-white",
                  )}
                >
                  <div className="flex flex-col gap-6">
                    {index === 1 ? (
                      <Image
                        src="/white-shape.svg"
                        alt="Imagen de fondo"
                        width={70}
                        height={50}
                        priority
                      />
                    ) : (
                      <Image
                        src="/red-shape.svg"
                        alt="Imagen de fondo"
                        width={70}
                        height={50}
                        priority
                      />
                    )}
                    <h3 className="text-xl font-semibold underline text-balance pr-24">
                      {solucion.title}
                    </h3>
                    <p
                      className={cn("text-right", index !== 1 ? "hidden" : "")}
                    >
                      {solucion.desc}
                    </p>
                    <Image
                      src="/right-arrow.svg"
                      alt="enRed Logo"
                      className="ml-auto"
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
      {/* Nuestros trabajos */}
      <section className="min-h-screen bg-red"></section>
      {/* Nuestros clientes */}
      <section className="mb-12">
        <div className="grid grid-cols-12 gap-4 p-12 items-center">
          <div className="col-span-3">
            <h2 className="text-5xl mb-6">Nuestros Clientes</h2>
          </div>
          <div className="col-span-3">
            <Image
              src="/cliente.svg"
              alt="Imagen de fondo"
              className="w-full h-auto"
              width={400}
              height={500}
              priority
            />
          </div>
          <div className="col-span-3">
            <Image
              src="/cliente.svg"
              alt="Imagen de fondo"
              className="w-full h-auto"
              width={400}
              height={500}
              priority
            />
          </div>
          <div className="col-span-3">
            <Image
              src="/cliente.svg"
              alt="Imagen de fondo"
              className="w-full h-auto"
              width={400}
              height={500}
              priority
            />
          </div>
        </div>
      </section>
      {/* Reseñas */}
      <section>
        <div className="grid grid-cols-12 gap-4 p-12 items-center">
          <div className="col-span-6 p-4 bg-red grid grid-cols-3 gap-4">
            <div className="col-span-1 p-4">
              <div className="rounded-full overflow-hidden aspect-square bg-white"></div>
            </div>
            <div className="col-span-2 flex flex-col text-white gap-3 justify-center">
              <Image
                src="/hearts.svg"
                alt="enRed Logo"
                className=""
                width={80}
                height={40}
              />
              <h4>John Doe</h4>
              <p>
                Garantizamos la mejor protección en edificios, obras en
                construcción, domicilios particulares, estructuras y otros
                espacios.
              </p>
            </div>
          </div>
          <div className="col-span-6 p-4 bg-red grid grid-cols-3 gap-4">
            <div className="col-span-1 p-4">
              <div className="rounded-full overflow-hidden aspect-square bg-white"></div>
            </div>
            <div className="col-span-2 flex flex-col text-white gap-3 justify-center">
              <Image
                src="/hearts.svg"
                alt="enRed Logo"
                className=""
                width={80}
                height={40}
              />
              <h4>John Doe</h4>
              <p>
                Garantizamos la mejor protección en edificios, obras en
                construcción, domicilios particulares, estructuras y otros
                espacios.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Cointacto */}
      <section className="bg-red">
        <div className="grid grid-cols-12 gap-4 p-12 items-center text-white">
          <div className="col-span-3 border-b border-white">
            <p className="p-4">Nombre y Apellido</p>
          </div>
          <div className="col-span-3 border-b border-white">
            <p className="p-4">Email</p>
          </div>
          <div className="col-span-3 border-b border-white">
            <p className="p-4">Consulta</p>
          </div>
          <div className="col-span-3 bg-black ">
            <p className="text-white py-4 px-6">Contactanos</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
