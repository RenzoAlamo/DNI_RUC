import Head from "next/head";
import { MouseEventHandler, useState } from "react";

type RUC = {
	nombre: string;
	tipoDocumento: string;
	numeroDocumento: string;
	estado: string;
	condicion: string;
	direccion: string;
	ubigeo: string;
	viaTipo: string;
	viaNombre: string;
	zonaCodigo: string;
	zonaTipo: string;
	numero: string;
	interior: string;
	lote: string;
	dpto: string;
	manzana: string;
	kilometro: string;
	distrito: string;
	provincia: string;
	departamento: string;
};

const IndexHead = () => {
	const domain = "https://search-dni_ruc.renzoalamo.vercel.app",
		title = "Buscar RUC",
		description = "Consulta RUC desde la SUNAT.",
		image = "data-pngrepo.png";
	return (
		<Head>
			<meta charSet="UTF-8" />
			<link rel="icon" type="image/png" href={`/${image}`} />
			<link rel="canonical" href={domain} />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={domain} />
			<meta property="og:image" content={`${domain}/${image}`} />
			<meta property="og:description" content={description} />
			<meta property="og:locale" content="es_PE" />
			<title>{title}</title>
		</Head>
	);
};

const classNames = {
	label: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
	input: "appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
	select: "block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
	button: "p-4 rounded-lg bg-indigo-300 dark:bg-indigo-800 dark:text-indigo-400 mb-2",
};

export const randomNumberBetween: (from: number, to: number) => number = (from, to) => {
	const length = to + 1 - from;
	return Math.floor(Math.random() * length + from);
};

const IndexPage = () => {
	const tipos = ["dni", "ruc"];
	const [tipo, setTipo] = useState("dni");
	const [numero, setNumero] = useState("");
	const [usuarioDNI, setUsuarioDNI] = useState({ nombres_apellidos: "", direccion: "", ubigeo: "", email: "", movil: "", fijo: "" });
	const [usuarioRUC, setUsuarioRUC] = useState({ razon_social: "", estado: "", condicion: "", direccion: "", ubigeo: "", distrito: "", provincia: "", departamento: "" });

	const search: MouseEventHandler<HTMLButtonElement> = async _ => {
		const request = await fetch(`api/dni_ruc`, {
			method: "POST",
			body: JSON.stringify({ tipo, numero }),
		}).then(response => response.json());
		if (request.error) return alert(request.error);
		if (request.message) return alert(`${tipo} no encontrado.`);
		if (tipo === "dni") {
			return setUsuarioDNI({
				nombres_apellidos: request.nombres.concat(" ", request.apellidoPaterno, " ", request.apellidoMaterno),
				direccion: request.direccion,
				ubigeo: request.ubigeo,
				email: request.nombres.split(" ")[0].toLowerCase().concat(request.apellidoPaterno.toLowerCase(), "@hotmail.com"),
				movil: String(randomNumberBetween(3000000, 7999999)),
				fijo: String(randomNumberBetween(900000000, 999999999)),
			});
		}
		setUsuarioRUC({
			razon_social: request.nombre,
			estado: request.estado,
			condicion: request.condicion,
			direccion: request.direccion,
			ubigeo: request.ubigeo,
			distrito: request.distrito,
			provincia: request.provincia,
			departamento: request.departamento,
		});
	};

	return (
		<>
			<IndexHead />
			<div className="grid grid-cols-4 gap-4">
				<div>
					<label htmlFor="" className={classNames.label}>
						Tipo
					</label>
					<select
						className={classNames.select}
						id="grid-state"
						value={tipo}
						onChange={event => {
							setTipo(event.target.value);
						}}>
						{tipos.map(tipo => (
							<option value={tipo}>{tipo.toUpperCase()}</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="" className={classNames.label}>
						DNI
					</label>
					<input type="text" className={classNames.input} name="" id="" onChange={event => setNumero(event.target.value)} />
				</div>
				<div>
					<button className={classNames.button} onClick={search}>
						Buscar por {tipo}
					</button>
				</div>
				{tipo === "dni" && (
					<>
						<div className="col-start-1 col-span-2">
							<label htmlFor="numero" className={classNames.label}>
								Nombres y Apellidos
							</label>
							<input type="text" readOnly className={classNames.input} name="numero" id="numero" value={usuarioDNI.nombres_apellidos} />
						</div>
						<div className="col-span-2">
							<label htmlFor="direccion" className={classNames.label}>
								Dirección
							</label>
							<input type="text" readOnly className={classNames.input} name="direccion" id="direccion" value={usuarioDNI.direccion} />
						</div>
						<div className="col-span-2">
							<label htmlFor="ubigeo" className={classNames.label}>
								Ubigeo
							</label>
							<input type="text" readOnly className={classNames.input} name="ubigeo" id="ubigeo" value={usuarioDNI.ubigeo} />
						</div>
						<div className="col-span-2">
							<label htmlFor="email" className={classNames.label}>
								Email
							</label>
							<input type="text" readOnly className={classNames.input} name="email" id="email" value={usuarioDNI.email} />
						</div>
						<div className="col-span-2">
							<label htmlFor="movil" className={classNames.label}>
								Teléfono móvil
							</label>
							<input type="text" readOnly className={classNames.input} name="movil" id="movil" value={usuarioDNI.movil} />
						</div>
						<div className="col-span-2">
							<label htmlFor="fijo" className={classNames.label}>
								Teléfono fijo
							</label>
							<input type="text" readOnly className={classNames.input} name="fijo" id="fijo" value={usuarioDNI.fijo} />
						</div>
					</>
				)}
				{tipo === "ruc" && (
					<>
						<div className="col-span-2">
							<label htmlFor="nombre" className={classNames.label}>
								Razón Social
							</label>
							<input type="text" readOnly className={classNames.input} name="nombre" id="nombre" value={usuarioRUC.razon_social} />
						</div>
						<div>
							<label htmlFor="estado" className={classNames.label}>
								Estado
							</label>
							<input type="text" readOnly className={classNames.input} name="estado" id="nombre" value={usuarioRUC.estado} />
						</div>
						<div>
							<label htmlFor="condicion" className={classNames.label}>
								Condición
							</label>
							<input type="text" readOnly className={classNames.input} name="condicion" id="condicion" value={usuarioRUC.condicion} />
						</div>
						<div className="col-span-2">
							<label htmlFor="direccion" className={classNames.label}>
								Dirección
							</label>
							<input type="text" readOnly className={classNames.input} name="direccion" id="direccion" value={usuarioRUC.direccion} />
						</div>
						<div>
							<label htmlFor="ubigeo" className={classNames.label}>
								Ubigeo
							</label>
							<input type="text" readOnly className={classNames.input} name="ubigeo" id="ubigeo" value={usuarioRUC.ubigeo} />
						</div>
						<div>
							<label htmlFor="distrito" className={classNames.label}>
								Distrito
							</label>
							<input type="text" readOnly className={classNames.input} name="distrito" id="distrito" value={usuarioRUC.distrito} />
						</div>
						<div className="col-span-2">
							<label htmlFor="provincia" className={classNames.label}>
								Provincia
							</label>
							<input type="text" readOnly className={classNames.input} name="provincia" id="provincia" value={usuarioRUC.provincia} />
						</div>
						<div className="col-span-2">
							<label htmlFor="provincia" className={classNames.label}>
								Provincia
							</label>
							<input type="text" readOnly className={classNames.input} name="provincia" id="provincia" value={usuarioRUC.provincia} />
						</div>
					</>
				)}
			</div>
		</>
	);
};
export default IndexPage;
