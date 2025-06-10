"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Acerca de Nosotros</h1>
          <p className="text-xl text-gray-600">
            Conoce más sobre el Sistema de Gestión de Firmas Electrónicas del DIF Jalisco.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Nuestra Misión</h2>
          <p className="text-gray-500 mb-6">
            El Sistema de Gestión de Firmas Electrónicas es una plataforma digital desarrollada con el objetivo
            de optimizar el control documental dentro del Sistema Nacional para el Desarrollo Integral de la
            Familia (DIF) en Jalisco. Su propósito principal es llevar control del registro, administración y
            verificación de los documentos emitidos por la institución que requieran validación mediante firmado
            electrónico. Este sistema permite llevar un seguimiento preciso de cada documento emitido,
            garantizando su disponibilidad, integridad y autenticidad jurídica, contribuyendo a mantener la
            reputación institucional y mejorar la eficiencia administrativa.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Características Clave</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Seguridad Avanzada</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-500">
                Encriptación de última generación para proteger la integridad y confidencialidad de los
                documentos y firmas.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Validez Legal</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-500">
                Firmas electrónicas con la misma validez legal que las firmas manuscritas.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Fácil de Usar</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-500">
                Interfaz intuitiva y accesible para facilitar la firma y verificación de documentos por parte
                de los usuarios.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Preguntas Frecuentes</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>¿Qué es una firma electrónica?</AccordionTrigger>
            <AccordionContent>
              Una firma electrónica es un conjunto de datos en formato electrónico, unidos a un documento
              electrónico, que se utilizan para identificar al firmante y garantizar la integridad del
              documento.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>¿Es seguro el sistema?</AccordionTrigger>
            <AccordionContent>
              Sí, el sistema utiliza tecnología de encriptación avanzada y cumple con los estándares de
              seguridad más exigentes para proteger la información y garantizar la validez legal de las
              firmas.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>¿Cómo puedo empezar a utilizar el sistema?</AccordionTrigger>
            <AccordionContent>
              Verifique sus firmas en la sección de verificación, o inicie sesión en su cuenta para acceder a las
              funcionalidades de firma electrónica. Si es nuevo, puede registrarse a través del apartado de
              autenticación.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Nuestro Equipo</h2>
        <p className="text-gray-500 mb-8">
          Un equipo de profesionales comprometidos con la innovación y la seguridad en la gestión de firmas
          electrónicas.
        </p>
        <div className="md:order-2 flex justify-center">
          <Image
            src="/equipo_about.png?height=500&width=600"
            alt="Equipo trabajando en el Sistema de Firmas"
            width={600}
            height={500}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;