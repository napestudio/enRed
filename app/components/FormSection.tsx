"use client";
import { MetricsDocumentData } from "@/prismicio-types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useIsomorphicLayoutEffect from "../lib/custom-hooks/useIsometricLayoutEffect";
import { gsap, ScrollTrigger } from "../lib/gsap";
import Metrics from "./Metrics";
import SectionHeading from "./SectionHeading";
import ArrowIcon from "./ui/Icons/ArrowIcon";

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
const inputClass =
  "bg-white w-full px-2 py-4 border-b text-2xs leading-none outline-none focus:border-enred-red transition-colors";
const errorClass = "text-red-500 text-[10px] mt-1";

export default function FormSection({
  metrics,
}: {
  metrics: MetricsDocumentData;
}) {
  const submitRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

  useIsomorphicLayoutEffect(() => {
    if (!submitRef.current || !formRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true }).from(formRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
      });

      ScrollTrigger.create({
        trigger: formRef.current,
        start: "top 90%",
        animation: tl,
        once: true,
      });

      const tl2 = gsap.timeline({ paused: true }).from(submitRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.6,
      });

      ScrollTrigger.create({
        trigger: formRef.current,
        start: "top 60%",
        animation: tl2,
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-enred-gray-light text-enred-black overflow-hidden">
      <div className="container gap-4 py-16 md:py-12 items-center">
        <div className="col-span-1 mb-12 flex gap-4 items-center text-enred-black">
          <SectionHeading title="Hablemos" style="text-black" />
        </div>

        <div className="grid w-full grid-cols-1 md:grid-cols-5 gap-16 md:gap-24">
          <div className="order-1 col-span-1 pt-12 w-full md:col-span-2 md:order-0 md:max-w-min relative h-full flex flex-col gap-8 justify-start">
            <Metrics items={metrics.main_metric} variant="big" />
            <div className="w-full flex md:flex-row flex-col justify-between gap-8 md:gap-2 items-center z-10">
              <Metrics items={metrics.second_metric} variant="small" />
              <Metrics items={metrics.third_metric} variant="small" />
            </div>
            <div className="absolute -left-100 top-0 -right-35 col-start-1 md:col-span-10  md:col-start-3 z-0 flex items-center pointer-events-none">
              <Image
                src="/gray-shape.svg"
                alt="enRed Logo"
                width={150}
                height={50}
                aria-hidden="true"
                className="w-full h-auto pointer-events-none"
              />
            </div>
          </div>
          <div
            className="col-span-1 md:col-span-3 order-0 md:order-1 z-10 w-full"
            ref={formRef}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-y-6 gap-x-4 w-full"
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
                  className="bg-white p-2 border-b outline-none focus:border-enred-red transition-colors"
                  {...register("mensaje")}
                />
              </div>

              {/* Submit */}
              <div className="col-span-2 justify-items-end" ref={submitRef}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-enred-red text-white px-10 py-4 flex justify-center items-center gap-2 group cursor-pointer"
                >
                  <span>
                    {isSubmitting ? "Enviando..." : "Enviar consulta"}
                  </span>
                  <span className="group-hover:translate-x-2 group-hover:scale-101 transition-transform duration-300">
                    <ArrowIcon className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
