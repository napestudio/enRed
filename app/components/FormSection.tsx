"use client";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Schema Zod
const schema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(7, "Teléfono inválido"),
  ubicacion: z.string().min(2, "Ingresá una ubicación"),
  medida: z.string().min(1, "Ingresá una medida"),
  tipoRed: z.string().min(2, "Ingresá el tipo de red"),
  mensaje: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function FormSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("🚀 ~ submit ~ data:", data);
    // acá podés hacer fetch/axios
  };

  const inputClass =
    "bg-white w-full px-2 py-4 border-b-2 text-2xs leading-none outline-none focus:border-enred-red transition-colors";
  const errorClass = "text-red-500 text-[10px] mt-1";

  return (
    <section className="bg-enred-gray-light text-enred-black overflow-hidden">
      <div className="max-w-[1440px] m-auto grid grid-cols-1 gap-4 py-16 px-6 md:p-12 items-center">
        <div className="col-span-1 mb-6 flex gap-4 items-center text-enred-black">
          <SectionHeading title="Hablemos" style="text-black" />
        </div>

        <div className="col-span-1 grid grid-cols-4 gap-16 md:gap-4">
          <div className="order-1 md:order-0 relative col-span-4 md:col-span-2 h-full flex flex-col gap-16 justify-center">
            <div className="z-10 flex flex-col items-center md:items-start gap-6">
              <h2 className="text-[3.5rem] md:text-[8rem] font-bold tracking-tight leading-[.75] m-0 z-10">
                +80.000
              </h2>
              <p className="text-[1.1rem] md:text-[2.5rem] leading-none m-0 z-10 indent-3">
                metros <span className="text-enred-red">en red</span> instalados
              </p>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-14 items-center z-10">
              <div className="flex flex-col gap-4">
                <h2 className="text-[3.5rem] font-bold tracking-tight leading-[.75] m-0 z-10">
                  +80.000
                </h2>
                <p className="text-[1.1rem] leading-none m-0 z-10">
                  metros <span className="text-enred-red">en red</span>{" "}
                  instalados
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-[3.5rem] font-bold tracking-tight leading-[.75] m-0 z-10">
                  +80.000
                </h2>
                <p className="text-[1.1rem] leading-none m-0 z-10">
                  metros <span className="text-enred-red">en red</span>{" "}
                  instalados
                </p>
              </div>
            </div>
            <div className="absolute -left-100 top-0 right-10 col-span-12 col-start-1 md:col-span-10 md:col-start-3 z-0 flex items-center">
              <Image
                src="/gray-shape.svg"
                alt="enRed Logo"
                width={150}
                height={50}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="order-0 md:order-1 col-span-4 md:col-span-2 z-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-y-6 gap-x-4"
            >
              {/* Nombre */}
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label className="text-xs">Nombre completo</label>
                <input
                  className={inputClass}
                  type="text"
                  {...register("nombre")}
                />
                {errors.nombre && (
                  <p className={errorClass}>{errors.nombre.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label className="text-xs">E-mail</label>
                <input
                  className={inputClass}
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className={errorClass}>{errors.email.message}</p>
                )}
              </div>

              {/* Teléfono */}
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label className="text-xs">Teléfono</label>
                <input
                  className={inputClass}
                  type="text"
                  {...register("telefono")}
                />
                {errors.telefono && (
                  <p className={errorClass}>{errors.telefono.message}</p>
                )}
              </div>

              {/* Ubicación */}
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label className="text-xs">Ubicación red</label>
                <input
                  className={inputClass}
                  type="text"
                  {...register("ubicacion")}
                />
                {errors.ubicacion && (
                  <p className={errorClass}>{errors.ubicacion.message}</p>
                )}
              </div>

              {/* Medida */}
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label className="text-xs">Medida</label>
                <input
                  className={inputClass}
                  type="text"
                  {...register("medida")}
                />
                {errors.medida && (
                  <p className={errorClass}>{errors.medida.message}</p>
                )}
              </div>

              {/* Tipo de red */}
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label className="text-xs">Tipo de red</label>
                <input
                  className={inputClass}
                  type="text"
                  {...register("tipoRed")}
                />
                {errors.tipoRed && (
                  <p className={errorClass}>{errors.tipoRed.message}</p>
                )}
              </div>

              {/* Mensaje */}
              <div className="col-span-2 flex flex-col gap-1">
                <label className="text-xs">Mensaje</label>
                <textarea
                  className="bg-white p-2 border-b-2 outline-none focus:border-enred-red transition-colors"
                  {...register("mensaje")}
                />
              </div>

              {/* Submit */}
              <div className="col-span-2 md:col-span-1 md:col-start-2 bg-enred-red">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white py-4 px-6 text-center disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? "Enviando..." : "Contactanos"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormSection;
