'use client';
import React, { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import geography from './features.json';
import useSWR from 'swr';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Fieldset, Text } from '@mantine/core';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Map() {
	const [opened, { open, close }] = useDisclosure(false);
	const [selected, setSelected] = useState(null);
	const { data, error } = useSWR('https://api.tinygs.com/v2/packets?satellite=PLEIADES-ORPHEUS', fetcher);

	const selectTransmission = (packet) => {
		setSelected(packet);
		open();
	};

	const Markers = useMemo(() => {
		if (!data || error) return [];

		const packets = data.packets;
		return packets.map((packet) => {
			return (
				<Marker key={packet.id} coordinates={[packet.satPos.lng, packet.satPos.lat]}>
					<circle r={5} fill="#F53" onClick={() => selectTransmission(packet)} />
				</Marker>
			);
		});
	}, [data, error]);

	return (
		<>
			<Drawer offset={8} radius="md" opened={opened} onClose={close} title={selected?.satellite}>
				<Fieldset legend="ID">
					<Text>{selected?.id}</Text>
				</Fieldset>
				<Fieldset legend="Properties">
					<Text>Mode: {selected?.mode}</Text>
					<Text>Frequency: {selected?.freq} Mhz</Text>
				</Fieldset>
				<Fieldset legend="Raw Data">
					<Text style={{ flexWrap: 'wrap', wordWrap: 'break-word' }}>{selected?.raw}</Text>
				</Fieldset>
			</Drawer>
			<ComposableMap>
				<ZoomableGroup>
					<Geographies geography={geography}>
						{({ geographies }) =>
							geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill="#D6D6DA" stroke="#FFF" strokeWidth={0.5} />)
						}
					</Geographies>
					{Markers}
				</ZoomableGroup>
			</ComposableMap>
		</>
	);
}
