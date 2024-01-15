import { Request, Response } from 'express';
import App from '../models/app.model';
import { APIResponse } from '../types/api-response';

export const addApp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, icon, url } = req.body;
    const newApp = await App.create({ name, icon, url });
    res.status(201).json({ data: newApp } as APIResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' } as APIResponse);
  }
};

export const updateApp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, icon, url } = req.body;

    const app = await App.findByPk(id);

    if (!app) {
      res.status(404).json({ error: 'App not found' } as APIResponse);
      return;
    }

    app.name = name;
    app.icon = icon;
    app.url = url;

    await app.save();

    res.json({ data: app } as APIResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' } as APIResponse);
  }
};

export const deleteApp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const app = await App.findByPk(id);

    if (!app) {
      res.status(404).json({ error: 'App not found' } as APIResponse);
      return;
    }

    await app.destroy();

    res.json({ data: { message: 'App deleted successfully' } } as APIResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' } as APIResponse);
  }
};

export const getApp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const app = await App.findByPk(id);

    if (!app) {
      res.status(404).json({ error: 'App not found' } as APIResponse);
      return;
    }
    res.json({ _msg:"App Retrieved",data: app, error:""} as APIResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ _msg:"Request Failed",data: {},error: 'Internal Server Error' } as APIResponse);
  }
};

export const listApps = async (req: Request, res: Response): Promise<void> => {
  try {
    const apps = await App.findAll();
    res.json({ _msg:"Apps Retrieved",data: apps, error:""} as APIResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' } as APIResponse);
  }
};
