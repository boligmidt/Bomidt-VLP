import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import Icon from 'components/general/Icon';
import theme from 'web/styles/theme';

const SelectWrap = styled.div`
	display: flex;
	background: white;
	position: relative;
	pointer-events: ${p => (p.disabled ? 'none' : 'initial')};
`;
const DropDown = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.16);
	border: 1px solid #e7f5f8;
	background-color: white;
	min-width: 100%;
	z-index: 2;
	max-height: 400px;
	overflow-y: auto;
	margin-bottom: 40px;
`;
export const CurrentOption = styled.div`
	width: 100%;
	font-weight: 700;
	color: ${p =>
		p.open && p.active ? p.theme.colors.pink : p.theme.colors.blue};
	padding: 10px;
	border-bottom: 1px solid ${p => p.theme.colors.lightGray};

	&:last-of-type {
		border: none;
	}

	&:hover {
		color: ${p => p.theme.colors.pink};
	}
`;
export const Option = styled.div`
	width: 100%;
	font-weight: 700;
	color: ${p =>
		p.open && p.active ? p.theme.colors.pink : p.theme.colors.blue};
	padding: 10px;
	border-bottom: 1px solid ${p => p.theme.colors.lightGray};

	&:last-of-type {
		border: none;
	}

	&:hover {
		color: ${p => p.theme.colors.pink};
	}
`;

const OptionLabel = styled.div`
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

export const IconWrap = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
	z-index: 1;
`;
const SearchInput = styled.input`
	display: block;
	width: 100%;
	font-weight: 500;
	border: none;
	outline: none;
`;

export default function Select({
	name,
	className,
	placeholder,
	onSelect = null,
	options: inputOptions,
	defaultValue = null,
	renderInput = true,
	disabled = false,
	searchable = false,
	inputProps = {},
	...props
}) {
	const [value, setValue] = useState(defaultValue);
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState(false);
	const node = useRef();

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);

	const handleClick = e => {
		if (node.current && node.current.contains(e.target)) {
			return;
		}
		setOpen(false);
	};

	function getLabel() {
		let label = '';
		options.forEach(option => {
			if (value === option.value) {
				label = option.label;
			}
		});

		return label || placeholder;
	}

	const handleSearch = debounce(value => setSearch(value), 200);

	let options = inputOptions;
	if (searchable && search.length) {
		const regex = new RegExp(search, 'gi');
		options = inputOptions.filter(option => option.label.match(regex));
	}

	return (
		<SelectWrap className={className} disabled={disabled}>
			<CurrentOption onClick={e => (disabled ? null : setOpen(true))}>
				<OptionLabel>{getLabel()}</OptionLabel>
			</CurrentOption>

			{open && options && (
				<DropDown ref={node}>
					{searchable && (
						<Option>
							<SearchInput
								type="text"
								onChange={e => handleSearch(e.target.value)}
								placeholder="Søk..."
								autoFocus
							/>
						</Option>
					)}

					{options.map(option => {
						return (
							<Option
								key={option.value}
								open={open}
								active={value === option.value}
								onClick={e => {
									setValue(option.value);
									if (onSelect) onSelect(option.value);
									setOpen(false);
								}}>
								<OptionLabel>{option.label}</OptionLabel>
							</Option>
						);
					})}
				</DropDown>
			)}
			<IconWrap onClick={e => setOpen(!open)}>
				<Icon
					icon={open ? 'angle-up' : 'angle-down'}
					marginRight="0"
					color={theme.colors.blue}
				/>
			</IconWrap>
			{renderInput && (
				<input
					type="hidden"
					name={name}
					value={value}
					{...inputProps}
				/>
			)}
		</SelectWrap>
	);
}
