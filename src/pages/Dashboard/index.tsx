import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiEdit } from 'react-icons/fi'
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Link } from 'react-router-dom';

import { FiPower, FiClock } from 'react-icons/fi';

import { Conteiner, Header, HeaderContent, Profile, Content, Schedule, Calendar, Section, Appointment } from './styles';

import logoImg from '../../assets/image002.png';
import { useAuth } from '../../hooks/auth';

import ButtonLogin from '../../components/ButtonLogin';


import api from '../../services/api';




interface MonthAvaulabilityItem{
    day: number;
    available: boolean;
}

interface Appointments {
    id: string;
    date: string;
    hourFormatted: string;
    client: {
        nome: string;
        avatar_url: string;
    }
}


const Dashboard: React.FC = () => {
    const { users, signOut } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const [monthAvailability, setMonthAvailability] = useState<MonthAvaulabilityItem[]>([]);

    const [appointments, setAppointments] = useState<Appointments[]>([]);


    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if(modifiers.available && !modifiers.disabled){
            setSelectedDate(day);
        }
    }, []);


    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    // useEffect(() => {
    //     api.get(`/providers/${users.id}/month-availability`,{
    //         params: {
    //             year: currentMonth.getFullYear(),
    //             month: currentMonth.getMonth() + 1,
    //         },
    //     }).then(response => {
    //         setMonthAvailability(response.data);
    //     }).catch(err => {
    //         throw new Error(err);
    //     });
    // }, [currentMonth, users.id]);


    // useEffect(() => {
    //     api.get<Appointments[]>('/appointments/me',{
    //         params: {
    //             year: selectedDate.getFullYear(),
    //             month: selectedDate.getMonth() + 1,
    //             day: selectedDate.getDate(),
    //         },
    //     }).then(response => {
    //         const appointmentsFormatted = response.data.map(appointment => {
    //             return {
    //                 ... appointment,
    //                 hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
    //             }
    //         })

    //         setAppointments(appointmentsFormatted);
    //     }).catch(err => {
    //         throw new Error(err);
    //       });
    // }, [selectedDate]);


    const disableDays = useMemo(() => {
        const dates = monthAvailability.filter(monthDay => monthDay.available === false).map(monthDay => {
            const year = currentMonth.getFullYear();
            const month = currentMonth.getMonth();

            return new Date(year, month, monthDay.day);
        });

        return dates;
    }, [currentMonth, monthAvailability]);


    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMMM", {
            locale: ptBR,
        });
    }, [selectedDate]);


    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', {
            locale: ptBR,
        });
    }, [selectedDate]);


    const morningAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() < 12;
        })
    }, [appointments]);


    const afternoonAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() >= 12;
        })
    }, [appointments]);


    const nextAppointments = useMemo(() => {
        return appointments.find(appointment =>
            isAfter(parseISO(appointment.date), new Date()),
        );
    }, [appointments]);


    return (

        <Conteiner>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt='Qualicorp' />

                    <Profile>
                        <img src={users.avatar_url} alt={users.nome}/>
                        <div>
                            <span>Bem vindo</span>
                            <Link to='/profile'><strong>{users.nome}</strong></Link>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>

            <Content>
                <Schedule>
                    <h1>Seu perfil, {users.nome}</h1>
                    <p>
                        {isToday(selectedDate) && <span>Hoje</span>}
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDay}</span>
                    </p>

                    <Section>
                        <strong>Nome</strong>

                        <p>{users.nome}</p>
                    </Section>

                    <Section>
                        <strong>Email</strong>

                        <p>{users.email}</p>
                    </Section>

                    <Section>
                        <strong>CPF</strong>

                        <p>{users.cpf}</p>
                    </Section>

                    <Section>
                        <strong>Telefone</strong>

                        <p>{users.telefone}</p>
                    </Section>

                    <Link to='/profile'>
                        <FiEdit/>
                        Editar Perfil
                    </Link>

                </Schedule>

            </Content>


        </Conteiner>
    );
}


export default Dashboard;
